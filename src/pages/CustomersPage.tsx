import React, { useState } from 'react';
import { Users, Filter, CheckCircle2, AlertTriangle, ArrowUpRight, Search } from 'lucide-react';
import { CustomerSegmentItem } from '../types';

export const CustomersPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const segments: CustomerSegmentItem[] = [
    { name: 'High Value', count: 320, pct: 13.1, revenue: 480000, avgSpend: 1500, churnRisk: 'Low' },
    { name: 'Regular', count: 980, pct: 40.0, revenue: 320000, avgSpend: 326, churnRisk: 'Low' },
    { name: 'New', count: 410, pct: 16.7, revenue: 95000, avgSpend: 231, churnRisk: 'Medium' },
    { name: 'Low Value', count: 360, pct: 14.7, revenue: 42000, avgSpend: 116, churnRisk: 'Medium' },
    { name: 'At Risk', count: 240, pct: 9.8, revenue: 76000, avgSpend: 316, churnRisk: 'High' },
    { name: 'Inactive', count: 140, pct: 5.7, revenue: 13000, avgSpend: 92, churnRisk: 'Critical' }
  ];

  const sampleCustomerList = [
    { id: 'CUST-0891', name: 'Apex Logistics Corp', purchases: 24, revenue: 38400, lastPurchase: '2 days ago', segment: 'High Value', risk: 'Low' },
    { id: 'CUST-0412', name: 'Global Cloud Systems', purchases: 18, revenue: 26800, lastPurchase: '5 days ago', segment: 'High Value', risk: 'Low' },
    { id: 'CUST-1049', name: 'Nexus Bio-Tech Labs', purchases: 12, revenue: 16400, lastPurchase: '94 days ago', segment: 'At Risk', risk: 'High' },
    { id: 'CUST-0283', name: 'Vanguard Enterprise', purchases: 9, revenue: 12200, lastPurchase: '110 days ago', segment: 'At Risk', risk: 'High' },
    { id: 'CUST-1922', name: 'Horizon Dynamics', purchases: 7, revenue: 8400, lastPurchase: '12 days ago', segment: 'Regular', risk: 'Low' },
    { id: 'CUST-3041', name: 'Synthex Dataworks', purchases: 2, revenue: 1850, lastPurchase: '8 days ago', segment: 'New', risk: 'Medium' },
  ];

  const filteredCustomers = sampleCustomerList.filter((c) => {
    const matchesSegment = selectedSegment === 'All' || c.segment === selectedSegment;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSegment && matchesSearch;
  });

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Customer Intelligence & CRM</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Customers & Cohorts
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Recency, Frequency, Monetary (RFM) behavioral segmentation across 2,450 accounts.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl text-right shadow-2xs shrink-0">
          <div className="text-[11px] text-slate-500 font-semibold uppercase">Net Dollar Retention</div>
          <div className="text-xl font-bold text-emerald-600 mt-0.5">94.2%</div>
        </div>
      </div>

      {/* KPI Cards (Matches Section 24) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] text-slate-500">Total Customers</div>
          <div className="text-lg font-bold text-slate-900 mt-1">2,450</div>
          <div className="text-[10.5px] text-emerald-600 font-medium">+102 MoM</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] text-slate-500">New Customers</div>
          <div className="text-lg font-bold text-blue-600 mt-1">410</div>
          <div className="text-[10.5px] text-slate-400">16.7% share</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] text-slate-500">Returning Accounts</div>
          <div className="text-lg font-bold text-slate-900 mt-1">1,900</div>
          <div className="text-[10.5px] text-emerald-600 font-medium">77.5% active</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] text-slate-500">Retention Rate</div>
          <div className="text-lg font-bold text-emerald-600 mt-1">94.2%</div>
          <div className="text-[10.5px] text-slate-400">Low churn</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] text-slate-500">Avg. Customer Value</div>
          <div className="text-lg font-bold text-slate-900 mt-1">$418.70</div>
          <div className="text-[10.5px] text-emerald-600 font-medium">+6.8% AOV</div>
        </div>
      </div>

      {/* Segments Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {segments.map((seg) => (
          <button
            key={seg.name}
            onClick={() => setSelectedSegment(selectedSegment === seg.name ? 'All' : seg.name)}
            className={`p-3 rounded-xl border text-left transition ${
              selectedSegment === seg.name
                ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-100 shadow-2xs'
                : 'bg-white border-slate-200/90 hover:bg-slate-50 shadow-2xs'
            }`}
          >
            <div className="text-xs font-bold text-slate-900">{seg.name}</div>
            <div className="text-base font-bold text-slate-800 mt-1">{seg.count}</div>
            <div className="text-[10.5px] text-slate-500 mt-0.5">{seg.pct}% • ${seg.revenue.toLocaleString()}</div>
            <div className="mt-2">
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${getRiskBadge(seg.churnRisk)}`}>
                {seg.churnRisk}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Customer Accounts Table (Matches Section 24: Customer, Purchases, Revenue, Last Purchase, Segment, Risk) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-[14px] font-bold text-slate-900">Customer Accounts Ledger</h3>
            <span className="text-xs text-slate-400">Filtered by {selectedSegment}</span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search account name or code..."
              className="pl-8 pr-3 py-1.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Customer Account</th>
                <th className="py-2.5 px-4">Code</th>
                <th className="py-2.5 px-4">Purchases</th>
                <th className="py-2.5 px-4">Lifetime Revenue</th>
                <th className="py-2.5 px-4">Last Purchase</th>
                <th className="py-2.5 px-4">Segment</th>
                <th className="py-2.5 px-4">Churn Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {c.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {c.id}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    {c.purchases} orders
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    ${c.revenue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {c.lastPurchase}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {c.segment}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded border ${getRiskBadge(c.risk)}`}>
                      {c.risk}
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
