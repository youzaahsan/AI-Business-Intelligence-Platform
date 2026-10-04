import React, { useState } from 'react';
import { TrendingUp, Filter, Globe, DollarSign, Package, ArrowUpRight } from 'lucide-react';
import { MonthlyRecord, ProductItem } from '../types';
import { BusinessOverviewChart, BarChart } from '../components/Charts';

interface AnalyticsPageProps {
  monthlyLedger: MonthlyRecord[];
  products: ProductItem[];
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ monthlyLedger, products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const chartData = monthlyLedger.map(m => ({
    date: m.month.split(' ')[0],
    revenue: m.revenue,
    customers: m.orders * 2,
    products: Math.round(m.netProfit / 50)
  }));

  const regionPerformance = [
    { region: 'North America', revenue: 540000, growth: '+14.2%', orders: 4210 },
    { region: 'Europe', revenue: 290000, growth: '+8.6%', orders: 2340 },
    { region: 'Asia Pacific', revenue: 142000, growth: '+19.1%', orders: 1210 },
    { region: 'Latin America', revenue: 54000, growth: '+4.4%', orders: 470 }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Sales & Revenue Dynamics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Analytics
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Comprehensive business intelligence across products, customer segments, and regional territories.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Hardware">Hardware</option>
            <option value="Cloud">Cloud Infrastructure</option>
            <option value="Software">Software SaaS</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Main Revenue Trajectory Chart */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14.5px] font-bold text-slate-900">Revenue & Order Volume Trajectory</h2>
            <p className="text-[11.5px] text-slate-500">April - September 2026 ledger totals</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">$1,026,000</div>
            <div className="text-xs text-emerald-600 font-medium">+18.4% Cumulative Growth</div>
          </div>
        </div>
        <BusinessOverviewChart data={chartData} height={210} showCustomers={true} showProducts={false} />
      </div>

      {/* Split Grid: SKU Table & Regional Volumes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Products Matrix (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-slate-900">Merchandise Margin Profile</h3>
            <span className="text-xs text-slate-500">{filteredProducts.length} items</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Product Name</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4">Aug Revenue</th>
                  <th className="py-2.5 px-4">Sep Revenue</th>
                  <th className="py-2.5 px-4">Margin Shift</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredProducts.map((p) => (
                  <tr key={p.sku} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {p.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{p.category}</td>
                    <td className="py-3 px-4 font-mono font-medium">${p.augRevenue.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">${p.sepRevenue.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono font-semibold">
                      <span className={p.problemDriver ? 'text-rose-600' : 'text-emerald-600'}>
                        {p.marginSep - p.marginAug > 0 ? '+' : ''}{(p.marginSep - p.marginAug).toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10.5px] px-2 py-0.5 rounded font-medium ${
                        p.problemDriver
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {p.problemDriver ? 'Compressed' : 'Healthy'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regional Volume Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <h3 className="text-[14px] font-bold text-slate-900">Regional Sales Volumes</h3>
          </div>

          <div className="space-y-3 pt-1">
            {regionPerformance.map((reg) => (
              <div key={reg.region} className="p-3 rounded-lg bg-slate-50/60 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">{reg.region}</span>
                  <span className="font-mono text-emerald-600 font-semibold">{reg.growth}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>${reg.revenue.toLocaleString()} Revenue</span>
                  <span>{reg.orders.toLocaleString()} Orders</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${(reg.revenue / 540000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
