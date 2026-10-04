import React, { useState } from 'react';
import { Package, TrendingUp, TrendingDown, Search, Filter, AlertTriangle, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { ProductItem } from '../types';
import { BarChart } from '../components/Charts';

interface ProductsPageProps {
  products: ProductItem[];
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const barChartData = products.map((p) => ({
    label: p.sku,
    value: p.sepRevenue,
    secondaryValue: p.sepProfit,
    color: p.problemDriver ? '#EF4444' : '#2563EB'
  }));

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
            <Package className="w-3.5 h-3.5" />
            <span>Merchandise Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Products & Catalog Performance
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Analyze product volume, revenue, contribution margins, and SKU profitability trends.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product or SKU..."
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Hardware">Hardware</option>
            <option value="Cloud">Cloud Infrastructure</option>
            <option value="Software">Software SaaS</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Top Chart Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14.5px] font-bold text-slate-900">September Revenue & Profit by SKU</h2>
            <p className="text-[11.5px] text-slate-500">Blue = Gross Revenue | Green = Net Profit | Red = Margin Alert</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Profit
            </span>
          </div>
        </div>
        <BarChart data={barChartData} height={190} />
      </div>

      {/* Product Catalog Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Product Performance Matrix</h3>
          <span className="text-xs text-slate-500">{filtered.length} products listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Aug Revenue</th>
                <th className="py-3 px-4">Sep Revenue</th>
                <th className="py-3 px-4">Aug Margin</th>
                <th className="py-3 px-4">Sep Margin</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item) => {
                const marginDelta = item.marginSep - item.marginAug;
                return (
                  <tr key={item.sku} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {item.sku}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      ${item.augRevenue.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      ${item.sepRevenue.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {item.marginAug.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold">
                      <span className={item.problemDriver ? 'text-rose-600' : 'text-emerald-600'}>
                        {item.marginSep.toFixed(1)}% ({marginDelta > 0 ? '+' : ''}{marginDelta.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.problemDriver ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                          <AlertTriangle className="w-3 h-3 text-rose-500" />
                          <span>Compressed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>Healthy</span>
                        </span>
                      )}
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
