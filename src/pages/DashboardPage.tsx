import React, { useState } from 'react';
import {
  Calendar,
  BarChart3,
  Users,
  Package,
  FileText,
  TrendingUp,
  Zap,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  Send,
  HelpCircle,
  Activity,
  LineChart
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { BusinessOverviewChart, MultiSeriesPoint } from '../components/Charts';
import { MonthlyRecord, ProductItem } from '../types';

interface DashboardProps {
  monthlyLedger: MonthlyRecord[];
  products: ProductItem[];
  onNavigate: (tab: string) => void;
  onExecuteHeroWorkflow: () => void;
  onAskAssistant?: (query: string) => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({
  monthlyLedger,
  products,
  onNavigate,
  onExecuteHeroWorkflow,
  onAskAssistant
}) => {
  const [timeFilter, setTimeFilter] = useState<'7D' | '30D' | '90D' | '1Y'>('7D');
  const [miniAssistantText, setMiniAssistantText] = useState('');

  // 7D Business Overview Series matching the reference screenshot
  const overview7DData: MultiSeriesPoint[] = [
    { date: 'Apr 20', revenue: 38000, customers: 1200, products: 450 },
    { date: 'Apr 21', revenue: 46000, customers: 1800, products: 580 },
    { date: 'Apr 22', revenue: 62000, customers: 2400, products: 690 },
    { date: 'Apr 23', revenue: 74000, customers: 2900, products: 820 },
    { date: 'Apr 24', revenue: 79000, customers: 3100, products: 890 },
    { date: 'Apr 25', revenue: 104000, customers: 4300, products: 1050 },
    { date: 'Apr 26', revenue: 125430, customers: 5100, products: 1248 }
  ];

  const handleMiniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!miniAssistantText.trim()) return;
    if (onAskAssistant) {
      onAskAssistant(miniAssistantText.trim());
    }
    onNavigate('assistant');
  };

  const handlePromptClick = (prompt: string) => {
    if (onAskAssistant) {
      onAskAssistant(prompt);
    }
    onNavigate('assistant');
  };

  return (
    <div className="space-y-6 pb-8">
      {/* 1. TOP GREETING & DATE (Matches Reference Screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Good Morning, <br className="sm:hidden" />
            <span>Ahsan Khan 👋</span>
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Here's what's happening with your AI agents and business intelligence today.
          </p>
        </div>

        <div className="flex items-center gap-2.5 text-right self-start sm:self-auto bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-2xs">
          <Calendar className="w-4 h-4 text-slate-400" />
          <div className="text-left">
            <div className="text-xs font-semibold text-slate-900 leading-tight">Apr 26, 2025</div>
            <div className="text-[11px] text-slate-400 leading-tight">Saturday, 10:24 AM</div>
          </div>
        </div>
      </div>

      {/* 2. FOUR MAIN KPI CARDS (Matches Reference Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Revenue"
          value="$125,430"
          change="12.5%"
          isPositive={true}
          subtext="vs. last 7 days"
          icon={BarChart3}
          colorScheme="blue"
          sparklineData={[38, 46, 62, 74, 79, 104, 125]}
        />
        <StatCard
          title="Total Customers"
          value="8,462"
          change="8.2%"
          isPositive={true}
          subtext="vs. last 7 days"
          icon={Users}
          colorScheme="green"
          sparklineData={[68, 71, 74, 78, 80, 82, 85]}
        />
        <StatCard
          title="Total Products"
          value="1,248"
          change="5.6%"
          isPositive={true}
          subtext="vs. last 7 days"
          icon={Package}
          colorScheme="purple"
          sparklineData={[112, 115, 118, 120, 121, 123, 125]}
        />
        <StatCard
          title="Total Reports"
          value="36"
          change="20.0%"
          isPositive={true}
          subtext="vs. last 7 days"
          icon={FileText}
          colorScheme="cyan"
          sparklineData={[24, 26, 27, 30, 31, 34, 36]}
        />
      </div>

      {/* 3. MAIN DASHBOARD CONTENT SPLIT (Left 68% / Right 32%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: 8 of 12 cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Row 1: Business Overview + Top Insights */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Business Overview Card (7 cols on tablet/desktop) */}
            <div className="md:col-span-7 bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[14.5px] font-bold text-slate-900">Business Overview</h2>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Revenue, customers and products performance
                    </p>
                  </div>

                  {/* Time Filters */}
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium shrink-0">
                    {(['7D', '30D', '90D', '1Y'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setTimeFilter(filter)}
                        className={`px-2 py-1 rounded-md transition ${
                          timeFilter === filter
                            ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Legend items */}
                <div className="flex items-center gap-4 mt-3 text-[11.5px] text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Revenue</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Customers</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Products</span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-3">
                <BusinessOverviewChart data={overview7DData} height={210} />
              </div>
            </div>

            {/* Top Insights Card (5 cols on tablet/desktop) */}
            <div className="md:col-span-5 bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-[14.5px] font-bold text-slate-900">Top Insights</h2>
                </div>

                {/* Insights List matching Reference Screenshot */}
                <div className="mt-4 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[12.5px] font-semibold text-slate-900 leading-tight">
                        Revenue increased by 12.5%
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Compared to last 7 days
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[12.5px] font-semibold text-slate-900 leading-tight">
                        Customer growth is strong
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        +8.2% this week
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[12.5px] font-semibold text-slate-900 leading-tight">
                        Product demand rising
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        +5.6% in top categories
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[12.5px] font-semibold text-slate-900 leading-tight">
                        No major anomalies detected
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        System is running smoothly
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('anomalies')}
                className="mt-4 pt-3 border-t border-slate-100 w-full text-left text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between transition"
              >
                <span>View Anomaly Monitoring</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Row 2: Agent Workflow + Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Agent Workflow Card */}
            <div className="md:col-span-6 bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-slate-900">Agent Workflow</h3>
                    <p className="text-[11px] text-slate-500">Your AI agents are working together</p>
                  </div>
                </div>
                <button
                  onClick={onExecuteHeroWorkflow}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  View All
                </button>
              </div>

              {/* Agent Nodes Pipeline matching Reference Screenshot */}
              <div className="grid grid-cols-4 gap-2 pt-2 items-center">
                {/* Node 1: Research Agent */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-2xs">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11.5px] font-semibold text-slate-800 leading-tight">Research</div>
                    <div className="text-[10px] text-slate-400">Agent</div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Completed</span>
                  </div>
                </div>

                {/* Node 2: Data Agent */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shadow-2xs">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11.5px] font-semibold text-slate-800 leading-tight">Data</div>
                    <div className="text-[10px] text-slate-400">Agent</div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Completed</span>
                  </div>
                </div>

                {/* Node 3: Analysis Agent */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shadow-2xs">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11.5px] font-semibold text-slate-800 leading-tight">Analysis</div>
                    <div className="text-[10px] text-slate-400">Agent</div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>Running</span>
                  </div>
                </div>

                {/* Node 4: Report Agent */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 text-slate-400 border border-slate-200 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11.5px] font-semibold text-slate-800 leading-tight">Report</div>
                    <div className="text-[10px] text-slate-400">Agent</div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-semibold bg-slate-100 px-1.5 py-0.5 rounded-full">
                    <span>Pending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="md:col-span-6 bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-slate-900">Recent Activity</h3>
                    <p className="text-[11px] text-slate-500">Latest system events</p>
                  </div>
                </div>
              </div>

              {/* Activity List matching Reference Screenshot */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-800 font-medium">Market Research completed</span>
                  </div>
                  <span className="text-[11px] text-slate-400">2 hours ago</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-800 font-medium">Sales Analysis generated</span>
                  </div>
                  <span className="text-[11px] text-slate-400">3 hours ago</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-800 font-medium">New dataset added</span>
                  </div>
                  <span className="text-[11px] text-slate-400">5 hours ago</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-800 font-medium">Report exported</span>
                  </div>
                  <span className="text-[11px] text-slate-400">6 hours ago</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-800 font-medium">Agent run completed</span>
                  </div>
                  <span className="text-[11px] text-slate-400">7 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Key Metrics (4 mini sparkline cards) */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-slate-900">Key Metrics</h3>
                <p className="text-[11px] text-slate-500">Detailed business intelligence at a glance</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
              {/* Metric 1: Total Sales */}
              <div className="p-3.5 rounded-lg bg-slate-50/60 border border-slate-200/70 space-y-2">
                <div className="text-[11.5px] text-slate-500 font-medium">Total Sales</div>
                <div className="text-lg font-bold text-slate-900 leading-none">$125,430</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 12.5%</span>
                  {/* Mini Sparkline */}
                  <svg viewBox="0 0 60 16" className="w-14 h-4">
                    <path d="M 0,12 L 12,10 L 24,11 L 36,7 L 48,8 L 60,3" fill="none" stroke="#2563EB" strokeWidth="1.8" />
                  </svg>
                </div>
              </div>

              {/* Metric 2: Orders */}
              <div className="p-3.5 rounded-lg bg-slate-50/60 border border-slate-200/70 space-y-2">
                <div className="text-[11.5px] text-slate-500 font-medium">Orders</div>
                <div className="text-lg font-bold text-slate-900 leading-none">2,842</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 10.3%</span>
                  <svg viewBox="0 0 60 16" className="w-14 h-4">
                    <path d="M 0,14 L 12,12 L 24,13 L 36,8 L 48,9 L 60,4" fill="none" stroke="#10B981" strokeWidth="1.8" />
                  </svg>
                </div>
              </div>

              {/* Metric 3: Conversion Rate */}
              <div className="p-3.5 rounded-lg bg-slate-50/60 border border-slate-200/70 space-y-2">
                <div className="text-[11.5px] text-slate-500 font-medium">Conversion Rate</div>
                <div className="text-lg font-bold text-slate-900 leading-none">3.24%</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 2.1%</span>
                  <svg viewBox="0 0 60 16" className="w-14 h-4">
                    <path d="M 0,11 L 12,13 L 24,9 L 36,10 L 48,6 L 60,4" fill="none" stroke="#8B5CF6" strokeWidth="1.8" />
                  </svg>
                </div>
              </div>

              {/* Metric 4: Avg Order Value */}
              <div className="p-3.5 rounded-lg bg-slate-50/60 border border-slate-200/70 space-y-2">
                <div className="text-[11.5px] text-slate-500 font-medium">Avg. Order Value</div>
                <div className="text-lg font-bold text-slate-900 leading-none">$44.12</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 6.8%</span>
                  <svg viewBox="0 0 60 16" className="w-14 h-4">
                    <path d="M 0,13 L 12,11 L 24,12 L 36,6 L 48,7 L 60,2" fill="none" stroke="#06B6D4" strokeWidth="1.8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 of 12 cols (Quick Actions + AI Assistant + System Status) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Quick Actions Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <h3 className="text-[14px] font-bold text-slate-900">Quick Actions</h3>
            </div>

            <div className="space-y-2">
              {/* Start Research */}
              <button
                onClick={() => onNavigate('research')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">Start Research</div>
                    <div className="text-[11px] text-slate-500">Ask AI to research anything</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
              </button>

              {/* Generate Report */}
              <button
                onClick={() => onNavigate('reports')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">Generate Report</div>
                    <div className="text-[11px] text-slate-500">Create business report</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
              </button>

              {/* Run Analysis */}
              <button
                onClick={() => onNavigate('analytics')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">Run Analysis</div>
                    <div className="text-[11px] text-slate-500">Analyze your data</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
              </button>

              {/* Upload Dataset */}
              <button
                onClick={() => onNavigate('datasets')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">Upload Dataset</div>
                    <div className="text-[11px] text-slate-500">Add new data source</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
              </button>
            </div>
          </div>

          {/* 2. AI Assistant Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-[14px] font-bold text-slate-900">AI Assistant</h3>
            </div>

            <div className="text-[12.5px] text-slate-700 leading-snug">
              <span className="font-semibold block text-slate-900">Hello! I'm your AI research assistant.</span>
              How can I help you today?
            </div>

            {/* Suggested Prompt Chips */}
            <div className="space-y-1.5 pt-1">
              {[
                'What are the latest trends in e-commerce?',
                'Analyze sales data for the last 30 days',
                'Find market opportunities in my industry',
                'Generate a business report'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full text-left p-2 rounded-lg bg-slate-50/70 hover:bg-blue-50/80 hover:text-blue-700 border border-slate-200/60 text-[11.5px] text-slate-600 transition truncate flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{prompt}</span>
                </button>
              ))}
            </div>

            {/* Mini Input Box */}
            <form onSubmit={handleMiniSubmit} className="pt-2 relative">
              <input
                type="text"
                value={miniAssistantText}
                onChange={(e) => setMiniAssistantText(e.target.value)}
                placeholder="Type your message..."
                className="w-full pl-3 pr-10 py-2.5 bg-slate-50/80 focus:bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-3.5 w-7 h-7 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-2xs"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>

            <div className="pt-1 text-center">
              <span className="text-[10.5px] text-slate-400 flex items-center justify-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                <span>Powered by Multi-Agent AI</span>
              </span>
            </div>
          </div>

          {/* 3. System Status Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-slate-900">System Status</h3>
              <div className="flex items-center gap-1.5 text-[11.5px] text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>All systems operational</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-1 text-xs">
              {[
                { name: 'AI Agents', status: 'Online' },
                { name: 'Database', status: 'Online' },
                { name: 'Data Pipeline', status: 'Online' },
                { name: 'API Services', status: 'Online' },
                { name: 'Frontend', status: 'Online' }
              ].map((svc) => (
                <div key={svc.name} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-none">
                  <span className="text-slate-600">{svc.name}</span>
                  <span className="font-semibold text-emerald-600 text-[11.5px]">{svc.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER (Matches Reference Screenshot) */}
      <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11.5px] text-slate-400">
        <div>
          Multi-Agent AI Research & Business Intelligence Platform
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <a href="#documentation" onClick={(e) => { e.preventDefault(); onNavigate('documents'); }} className="hover:text-slate-800 transition">Documentation</a>
          <span>·</span>
          <span className="hover:text-slate-800 transition cursor-pointer">Privacy</span>
          <span>·</span>
          <span className="hover:text-slate-800 transition cursor-pointer">Terms</span>
          <span>·</span>
          <span className="hover:text-slate-800 transition cursor-pointer">Support</span>
          <span>·</span>
          <span className="font-mono text-slate-400">v1.0.0</span>
        </div>
      </div>
    </div>
  );
};
