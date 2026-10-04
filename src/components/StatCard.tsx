import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  subtext?: string;
  icon: LucideIcon;
  colorScheme?: 'blue' | 'green' | 'purple' | 'cyan' | 'amber' | 'rose';
  sparklineData?: number[];
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtext = 'vs. last 7 days',
  icon: Icon,
  colorScheme = 'blue',
  sparklineData = [20, 24, 22, 28, 26, 32, 36, 40]
}) => {
  const schemeStyles = {
    blue: {
      iconBg: 'bg-blue-50 text-blue-600',
      stroke: '#3B82F6',
      gradFrom: '#60A5FA',
      gradTo: '#93C5FD'
    },
    green: {
      iconBg: 'bg-emerald-50 text-emerald-600',
      stroke: '#10B981',
      gradFrom: '#34D399',
      gradTo: '#A7F3D0'
    },
    purple: {
      iconBg: 'bg-purple-50 text-purple-600',
      stroke: '#8B5CF6',
      gradFrom: '#A78BFA',
      gradTo: '#DDD6FE'
    },
    cyan: {
      iconBg: 'bg-cyan-50 text-cyan-600',
      stroke: '#06B6D4',
      gradFrom: '#22D3EE',
      gradTo: '#BAE6FD'
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600',
      stroke: '#F59E0B',
      gradFrom: '#FBBF24',
      gradTo: '#FDE68A'
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-600',
      stroke: '#F43F5E',
      gradFrom: '#FB7185',
      gradTo: '#FECDD3'
    }
  };

  const scheme = schemeStyles[colorScheme] || schemeStyles.blue;

  // Generate smooth SVG sparkline path
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 120;
  const height = 32;

  const points = sparklineData.map((val, idx) => {
    const x = (idx / (sparklineData.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* Top: Icon */}
        <div className="flex items-center justify-between">
          <div className={`w-9 h-9 rounded-lg ${scheme.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <div className="text-[12.5px] font-medium text-slate-500 mt-3">
          {title}
        </div>

        {/* Large Metric Value */}
        <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
          {value}
        </div>
      </div>

      {/* Bottom: Change indicator + Sparkline */}
      <div className="mt-3.5 flex items-end justify-between">
        <div className="space-y-0.5">
          <div className={`flex items-center text-[12px] font-semibold ${
            isPositive ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {isPositive ? (
              <span className="mr-1">↑</span>
            ) : (
              <span className="mr-1">↓</span>
            )}
            <span>{change}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            {subtext}
          </div>
        </div>

        {/* Clean Sparkline */}
        <div className="w-24 h-8 shrink-0">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <path
              d={pathD}
              fill="none"
              stroke={scheme.stroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
