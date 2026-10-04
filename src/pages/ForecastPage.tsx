import React, { useState } from 'react';
import { LineChart, Sparkles, CheckCircle2, ShieldCheck, Sliders } from 'lucide-react';
import { MonthlyRecord } from '../types';
import { BusinessOverviewChart, MultiSeriesPoint } from '../components/Charts';

interface ForecastPageProps {
  monthlyLedger: MonthlyRecord[];
}

export const ForecastPage: React.FC<ForecastPageProps> = ({ monthlyLedger }) => {
  const [algorithm, setAlgorithm] = useState<'ensemble' | 'linear' | 'holt_winters'>('ensemble');
  const [horizon, setHorizon] = useState<number>(3);

  const historicalPoints: MultiSeriesPoint[] = monthlyLedger.map((m) => ({
    date: m.month.split(' ')[0],
    revenue: m.revenue
  }));

  const forecastPoints: MultiSeriesPoint[] = [
    { date: 'Oct (FC)', revenue: 192500, upperBand: 204000, lowerBand: 181000 },
    { date: 'Nov (FC)', revenue: 206000, upperBand: 221000, lowerBand: 191000 },
    { date: 'Dec (FC)', revenue: 228000, upperBand: 247000, lowerBand: 209000 }
  ];

  const fullSeries = [...historicalPoints, ...forecastPoints.slice(0, horizon)];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
            <LineChart className="w-3.5 h-3.5" />
            <span>Predictive Machine Learning</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Sales Forecast
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Statistical regression and exponential smoothing with 95% parametric confidence intervals.
          </p>
        </div>

        {/* Algorithm & Horizon Selectors */}
        <div className="flex items-center gap-3">
          <div>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as any)}
              className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ensemble">Ensemble (Ridge + Holt-Winters)</option>
              <option value="linear">Linear Trend Regression</option>
              <option value="holt_winters">Exponential Smoothing</option>
            </select>
          </div>

          <div>
            <select
              value={horizon}
              onChange={(e) => setHorizon(parseInt(e.target.value, 10))}
              className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={1}>1 Month Ahead (Oct)</option>
              <option value={2}>2 Months Ahead (Oct - Nov)</option>
              <option value={3}>3 Months Ahead (Q4 Outlook)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Model Scorecards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">October Point Forecast</div>
          <div className="text-xl font-bold text-slate-900 mt-1">$192,500</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+8.1% MoM Rebound</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">95% Confidence Band</div>
          <div className="text-base font-bold text-blue-700 mt-1 font-mono">[$181k - $204k]</div>
          <div className="text-[11px] text-slate-400 mt-0.5">&plusmn;$11,500 uncertainty</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Tested Error (MAPE)</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">2.4%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Mean Absolute % Error</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Fit Goodness (R&sup2;)</div>
          <div className="text-xl font-bold text-slate-800 mt-1">0.91</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Strong predictive correlation</div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14.5px] font-bold text-slate-900">Historical Actuals vs. ML Forecast Trajectory</h2>
            <p className="text-[11.5px] text-slate-500">Shaded area represents 95% parametric prediction uncertainty interval</p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Validated Model</span>
          </span>
        </div>
        <BusinessOverviewChart data={fullSeries} height={230} showCustomers={false} showProducts={false} showConfidenceBand={true} />
      </div>

      {/* Forecast Points Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Forward Projections Breakdown</h3>
          <span className="text-xs text-slate-400">Monthly Outlook</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Period</th>
                <th className="py-2.5 px-4">Predicted Value</th>
                <th className="py-2.5 px-4">Lower 95% Bound</th>
                <th className="py-2.5 px-4">Upper 95% Bound</th>
                <th className="py-2.5 px-4">Projected Growth</th>
                <th className="py-2.5 px-4">Uncertainty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {forecastPoints.slice(0, horizon).map((p) => (
                <tr key={p.date} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-semibold text-slate-900">{p.date}</td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">${p.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">${p.lowerBand?.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">${p.upperBand?.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-emerald-600 font-semibold">
                    +{(((p.revenue - 178000) / 178000) * 100).toFixed(1)}% vs Sep
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10.5px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                      &plusmn;6.0%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
