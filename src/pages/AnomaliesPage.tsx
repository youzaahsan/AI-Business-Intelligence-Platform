import React, { useState } from 'react';
import { AlertTriangle, Filter, CheckCircle2, ShieldAlert } from 'lucide-react';
import { AnomalyItem } from '../types';

interface AnomaliesPageProps {
  anomalies: AnomalyItem[];
}

export const AnomaliesPage: React.FC<AnomaliesPageProps> = ({ anomalies }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  const filtered = selectedSeverity === 'All'
    ? anomalies
    : anomalies.filter((a) => a.severity.toLowerCase() === selectedSeverity.toLowerCase());

  const getSeverityBadge = (severity: AnomalyItem['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Telemetry & Outlier Detection</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Anomalies
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Statistical outlier monitoring tracking sudden margin contractions and unexpected expense spikes.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Severity:</span>
          </div>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Severities ({anomalies.length})</option>
            <option value="Critical">Critical (1)</option>
            <option value="High">High (1)</option>
            <option value="Medium">Medium (1)</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Total Flagged</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{anomalies.length} Outliers</div>
          <div className="text-[11px] text-slate-400 mt-0.5">September monitoring window</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Critical Severity</div>
          <div className="text-xl font-bold text-rose-600 mt-1">1 Outlier</div>
          <div className="text-[11px] text-rose-600 mt-0.5">Z-Score 2.82 (&gt;2.5&sigma;)</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Margin Impact</div>
          <div className="text-xl font-bold text-amber-600 mt-1">-7.0%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Hardware category concentrated</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Diagnosis Attribution</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">100% Attributed</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Root causes isolated</div>
        </div>
      </div>

      {/* Anomalies Table (Matches Section 23: Date, Metric, Expected, Actual, Deviation, Severity, Reason) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Detected Financial & Volume Anomalies</h3>
          <span className="text-xs text-slate-400">{filtered.length} entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Metric</th>
                <th className="py-2.5 px-4">Expected</th>
                <th className="py-2.5 px-4">Actual</th>
                <th className="py-2.5 px-4">Deviation</th>
                <th className="py-2.5 px-4">Severity</th>
                <th className="py-2.5 px-4">Diagnosis / Root Cause</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((anom) => {
                const deviation = typeof anom.expected === 'number' && typeof anom.actual === 'number'
                  ? (((anom.actual - anom.expected) / anom.expected) * 100).toFixed(1)
                  : '-';
                return (
                  <tr key={anom.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                      {anom.date}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {anom.metric}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {typeof anom.expected === 'number' && anom.expected > 100
                        ? `$${anom.expected.toLocaleString()}`
                        : `${anom.expected}%`}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {typeof anom.actual === 'number' && anom.actual > 100
                        ? `$${anom.actual.toLocaleString()}`
                        : `${anom.actual}%`}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold">
                      <span className="text-rose-600">
                        {deviation}%
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded border ${getSeverityBadge(anom.severity)}`}>
                        {anom.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11.5px] max-w-md">
                      {anom.reason}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
