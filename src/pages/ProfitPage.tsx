import React from 'react';
import { DollarSign, TrendingDown, AlertTriangle, ShieldAlert, ArrowDownRight, Layers } from 'lucide-react';
import { MonthlyRecord, ProductItem } from '../types';
import { BusinessOverviewChart, BarChart } from '../components/Charts';

interface ProfitPageProps {
  monthlyLedger: MonthlyRecord[];
  products: ProductItem[];
}

export const ProfitPage: React.FC<ProfitPageProps> = ({ monthlyLedger, products }) => {
  const profitTrendData = monthlyLedger.map((m) => ({
    date: m.month.split(' ')[0],
    revenue: m.grossProfit,
    customers: Math.round(m.netProfit / 10)
  }));

  const productProfitComparison = products.map((p) => ({
    label: p.sku,
    value: p.augProfit,
    secondaryValue: p.sepProfit,
    color: '#2563EB'
  }));

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner Alert */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Margin & Expense Diagnostics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Profitability & Margin Analysis
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Detailed ledger breakdown comparing Revenue, COGS, and OPEX across 6 fiscal months.
          </p>
        </div>

        <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-right shrink-0">
          <div className="text-[11px] text-rose-700 font-semibold uppercase">September Net Margin</div>
          <div className="text-xl sm:text-2xl font-bold text-rose-700 mt-0.5">24.0%</div>
          <div className="text-[11px] text-rose-600">Contracted from 31.0% in August</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">6-Month Gross Profit</div>
          <div className="text-xl font-bold text-slate-900 mt-1">$483,290</div>
          <div className="text-[11px] text-blue-600 mt-0.5 font-medium">47.1% Gross Margin</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">6-Month Net Profit</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">$311,870</div>
          <div className="text-[11px] text-slate-500 mt-0.5">30.4% Average Net</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">September COGS Surge</div>
          <div className="text-xl font-bold text-rose-600 mt-1">$105,020</div>
          <div className="text-[11px] text-rose-600 mt-0.5 font-medium">+3.6% cost on -8.7% sales</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">September Profit Dip</div>
          <div className="text-xl font-bold text-amber-600 mt-1">-$17,730</div>
          <div className="text-[11px] text-slate-400 mt-0.5">vs. August Peak ($60,450)</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14.5px] font-bold text-slate-900">Gross vs Net Profit Trajectory</h2>
              <p className="text-[11.5px] text-slate-500">Illustrating margin contraction divergence in September</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Gross Profit
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Net Profit
              </span>
            </div>
          </div>
          <BusinessOverviewChart data={profitTrendData} height={210} showCustomers={true} showProducts={false} />
        </div>

        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-slate-900">SKU Profit: Aug vs Sep</h3>
            <p className="text-[11px] text-slate-500">Blue = Aug Profit | Green = Sep Profit</p>
            <div className="mt-2">
              <BarChart data={productProfitComparison} height={170} />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Key Finding:</strong> SKU-PRO-X1 suffered a 50% profit reduction ($28.4k down to $14.2k) due to supplier component surcharges.
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Monthly P&L Ledger Accounting</h3>
          <span className="text-xs text-slate-400">Audited Financials</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Period</th>
                <th className="py-2.5 px-4">Gross Revenue</th>
                <th className="py-2.5 px-4">COGS</th>
                <th className="py-2.5 px-4">Gross Profit</th>
                <th className="py-2.5 px-4">OPEX</th>
                <th className="py-2.5 px-4">Net Profit</th>
                <th className="py-2.5 px-4">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {monthlyLedger.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-semibold text-slate-900">{row.month}</td>
                  <td className="py-3 px-4 font-mono font-medium">${row.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">${row.cogs.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-blue-600 font-semibold">${row.grossProfit.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">${row.opex.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">${row.netProfit.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10.5px] font-semibold ${
                      row.margin < 30 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {row.margin.toFixed(1)}%
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
