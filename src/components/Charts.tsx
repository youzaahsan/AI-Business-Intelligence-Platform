import React, { useState } from 'react';

// Multi-series business overview chart matching the reference screenshot
export interface MultiSeriesPoint {
  date: string;
  revenue: number;
  customers?: number;
  products?: number;
  upperBand?: number;
  lowerBand?: number;
}

interface BusinessOverviewChartProps {
  data: MultiSeriesPoint[];
  height?: number;
  showCustomers?: boolean;
  showProducts?: boolean;
  showConfidenceBand?: boolean;
}

export const BusinessOverviewChart: React.FC<BusinessOverviewChartProps> = ({
  data,
  height = 240,
  showCustomers = true,
  showProducts = true,
  showConfidenceBand = false
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-slate-400 text-xs">No chart data available</div>;
  }

  const padding = { top: 15, right: 20, bottom: 25, left: 45 };
  const width = 640;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find max value across all visible metrics
  const maxRevenue = Math.max(...data.map(d => Math.max(d.revenue, d.upperBand || 0)), 125000);
  const maxVal = Math.ceil(maxRevenue / 25000) * 25000;
  const minVal = 0;

  const getX = (i: number) => padding.left + (i / (data.length - 1)) * chartWidth;
  const getY = (val: number) => padding.top + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;

  // Scale secondary metrics for smooth stacked visual comparison if needed
  const getCustomerY = (cVal: number) => getY(cVal * 10);
  const getProductY = (pVal: number) => getY(pVal * 30);

  // Revenue line & fill
  const revPoints = data.map((d, i) => `${getX(i)},${getY(d.revenue)}`).join(' ');
  const areaPath = `M ${getX(0)},${padding.top + chartHeight} L ${revPoints.split(' ').join(' L ')} L ${getX(data.length - 1)},${padding.top + chartHeight} Z`;

  // Secondary lines
  const custPoints = showCustomers && data[0]?.customers !== undefined
    ? data.map((d, i) => `${getX(i)},${getCustomerY(d.customers || 0)}`).join(' ')
    : null;

  const prodPoints = showProducts && data[0]?.products !== undefined
    ? data.map((d, i) => `${getX(i)},${getProductY(d.products || 0)}`).join(' ')
    : null;

  // Optional Confidence band
  let confidencePath = null;
  if (showConfidenceBand && data.some(d => d.upperBand !== undefined)) {
    const uppers = data.map((d, i) => `${getX(i)},${getY(d.upperBand || d.revenue)}`);
    const lowers = [...data].reverse().map((d, i) => {
      const origIdx = data.length - 1 - i;
      return `${getX(origIdx)},${getY(d.lowerBand || d.revenue)}`;
    });
    confidencePath = `M ${uppers[0]} L ${uppers.join(' L ')} L ${lowers.join(' L ')} Z`;
  }

  // Y-axis grid ticks: 0, 25k, 50k, 75k, 105k, 125k
  const ticks = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="refBlueArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="refBandArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {ticks.map((t) => {
          const y = padding.top + chartHeight * (1 - t);
          const val = Math.round(minVal + t * (maxVal - minVal));
          return (
            <g key={t}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#F1F5F9"
                strokeWidth="1.2"
              />
              <text
                x={padding.left - 8}
                y={y + 3.5}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-sans"
              >
                {val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val}
              </text>
            </g>
          );
        })}

        {/* Confidence Band Polygon */}
        {confidencePath && (
          <path
            d={confidencePath}
            fill="url(#refBandArea)"
            stroke="#818CF8"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}

        {/* Revenue gradient area */}
        <path d={areaPath} fill="url(#refBlueArea)" />

        {/* Revenue blue line */}
        <polyline
          points={revPoints}
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Customers green line */}
        {custPoints && (
          <polyline
            points={custPoints}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Products purple line */}
        {prodPoints && (
          <polyline
            points={prodPoints}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* X-axis date labels and hover vertical markers */}
        {data.map((d, i) => {
          const x = getX(i);
          const isHovered = hoverIndex === i;
          return (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Vertical crosshair */}
              {isHovered && (
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + chartHeight}
                  stroke="#94A3B8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              )}

              {/* Data points */}
              <circle
                cx={x}
                cy={getY(d.revenue)}
                r={isHovered ? 4.5 : 3}
                fill={isHovered ? '#2563EB' : '#FFFFFF'}
                stroke="#2563EB"
                strokeWidth="2"
              />

              {/* X Date Label */}
              <text
                x={x}
                y={height - 8}
                textAnchor="middle"
                className={`text-[10px] font-sans ${isHovered ? 'fill-slate-900 font-semibold' : 'fill-slate-400'}`}
              >
                {d.date}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoverIndex !== null && data[hoverIndex] && (
        <div
          className="absolute z-20 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-lg p-2.5 shadow-md text-xs pointer-events-none transition-all"
          style={{
            top: '8px',
            left: `${Math.min(75, Math.max(15, (hoverIndex / (data.length - 1)) * 80))}%`
          }}
        >
          <div className="font-semibold text-slate-800 border-b border-slate-100 pb-1 mb-1.5">
            {data[hoverIndex].date}
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between gap-4 text-blue-600 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Revenue:
              </span>
              <span className="font-bold text-slate-900">${data[hoverIndex].revenue.toLocaleString()}</span>
            </div>
            {data[hoverIndex].customers !== undefined && (
              <div className="flex items-center justify-between gap-4 text-emerald-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Customers:
                </span>
                <span className="font-bold text-slate-900">{data[hoverIndex].customers?.toLocaleString()}</span>
              </div>
            )}
            {data[hoverIndex].products !== undefined && (
              <div className="flex items-center justify-between gap-4 text-purple-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Products:
                </span>
                <span className="font-bold text-slate-900">{data[hoverIndex].products?.toLocaleString()}</span>
              </div>
            )}
            {data[hoverIndex].upperBand !== undefined && (
              <div className="text-[10px] text-slate-500 pt-0.5 border-t border-slate-100">
                95% CI: [${data[hoverIndex].lowerBand?.toLocaleString()} - ${data[hoverIndex].upperBand?.toLocaleString()}]
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Bar Chart Component (Clean Light Mode)
export interface BarItem {
  label: string;
  value: number;
  secondaryValue?: number;
  color?: string;
}

export const BarChart: React.FC<{ data: BarItem[]; height?: number; valuePrefix?: string }> = ({
  data,
  height = 180,
  valuePrefix = '$'
}) => {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data.map(d => Math.max(d.value, d.secondaryValue || 0))) * 1.15 || 100;

  return (
    <div className="w-full flex items-end gap-2.5 pt-4 pb-2" style={{ height }}>
      {data.map((item, idx) => {
        const heightPct = Math.max(6, (item.value / maxVal) * 100);
        const secHeightPct = item.secondaryValue ? (item.secondaryValue / maxVal) * 100 : null;

        return (
          <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
            {/* Tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-20">
              {item.label}: {valuePrefix}{item.value.toLocaleString()}
              {item.secondaryValue !== undefined && ` (Net: ${valuePrefix}${item.secondaryValue.toLocaleString()})`}
            </div>

            <div className="w-full flex items-end justify-center gap-1 h-full">
              {/* Primary Bar */}
              <div
                className="w-full max-w-[20px] rounded-t-sm transition-all duration-300"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: item.color || '#3B82F6'
                }}
              />
              {/* Secondary Bar */}
              {secHeightPct !== null && (
                <div
                  className="w-full max-w-[14px] rounded-t-sm transition-all duration-300 bg-emerald-500"
                  style={{ height: `${secHeightPct}%` }}
                />
              )}
            </div>

            <span className="text-[10.5px] text-slate-500 mt-2 truncate max-w-full text-center font-medium" title={item.label}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
