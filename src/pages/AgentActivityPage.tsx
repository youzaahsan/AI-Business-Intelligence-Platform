import React from 'react';
import { Cpu, CheckCircle2, Clock, ShieldCheck, Zap, DollarSign, Terminal, Activity } from 'lucide-react';
import { WorkflowResult } from '../types';

interface AgentActivityPageProps {
  workflowRuns: WorkflowResult[];
}

export const AgentActivityPage: React.FC<AgentActivityPageProps> = ({ workflowRuns }) => {
  const runs = workflowRuns.length > 0 ? workflowRuns : [
    {
      taskId: 'task-9a8f21e',
      status: 'completed',
      prompt: 'Analyze my last 6 months of sales, explain why profit decreased in September, identify the products causing the problem, forecast October sales, and give me recommendations.',
      plan: [],
      steps: [
        { agentName: 'Supervisor Agent', status: 'completed', durationMs: 140, tokens: 280, toolsUsed: ['intent_classifier', 'execution_graph_builder'], summary: 'Deconstructed query into 6-phase analytical pipeline across 6 worker agents.' },
        { agentName: 'Data Analyst Agent', status: 'completed', durationMs: 390, tokens: 410, toolsUsed: ['python_analysis_tool', 'pandas_aggregator'], summary: 'Computed 6-month ledger trajectory: Revenue $195k -> $178k, Profit $60.4k -> $42.7k.' },
        { agentName: 'Business Intelligence Agent', status: 'completed', durationMs: 310, tokens: 380, toolsUsed: ['margin_decomposer', 'kpi_calculator'], summary: 'Diagnosed SKU-PRO-X1 (-50% profit) and Fiber Kit (-85% profit).' },
        { agentName: 'Anomaly Detection Agent', status: 'completed', durationMs: 240, tokens: 220, toolsUsed: ['iqr_detector', 'zscore_analyzer'], summary: 'Flagged Critical Severity margin drop on Sept 14 (Z-Score 2.82).' },
        { agentName: 'Forecasting Agent', status: 'completed', durationMs: 360, tokens: 340, toolsUsed: ['ensemble_forecaster', 'confidence_interval_calc'], summary: 'Forecasted October sales at $192,500 (+8.1% MoM). 95% CI: [$181k, $204k].' },
        { agentName: 'Fact Checker Agent', status: 'completed', durationMs: 220, tokens: 210, toolsUsed: ['arithmetic_auditor', 'source_grounding_tool'], summary: 'Verified 100% of mathematical ratios and deltas against ledger.' },
        { agentName: 'Report Agent', status: 'completed', durationMs: 420, tokens: 480, toolsUsed: ['report_synthesizer', 'document_exporter'], summary: 'Synthesized structured executive brief and prioritized strategic roadmap.' }
      ],
      finalReport: {} as any,
      totalDurationMs: 2080,
      totalTokens: 2320,
      estimatedCostUsd: '0.00348'
    } as WorkflowResult
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Agent Telemetry & Telemetry</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Agent Runs
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Audit log of agent run states, durations, tokens consumed, and invoked tools.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl text-right shadow-2xs shrink-0">
          <div className="text-[11px] text-slate-500 font-semibold uppercase">Active Fleet</div>
          <div className="text-base font-bold text-emerald-600 mt-0.5">10 Agents Online</div>
        </div>
      </div>

      {/* Aggregate Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Total Workflow Runs</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{runs.length} Runs</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">100% Success Rate</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Average Latency</div>
          <div className="text-xl font-bold text-blue-600 mt-1">
            {Math.round(runs.reduce((a, b) => a + b.totalDurationMs, 0) / runs.length)}ms
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Fast sub-second routing</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Tokens Consumed</div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {runs.reduce((a, b) => a + b.totalTokens, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Prompt & completion total</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11.5px] text-slate-500 font-medium">Estimated AI Cost</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">
            ${runs.reduce((a, b) => a + parseFloat(b.estimatedCostUsd || '0.003'), 0).toFixed(4)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Efficient token caching</div>
        </div>
      </div>

      {/* Runs Execution List */}
      <div className="space-y-5">
        {runs.map((run, rIdx) => (
          <div key={rIdx} className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-600">{run.taskId}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {run.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium italic">"{run.prompt}"</p>
              </div>
              <div className="text-left sm:text-right text-xs text-slate-500 font-mono">
                Duration: <strong className="text-slate-900">{run.totalDurationMs}ms</strong> • Tokens:{' '}
                <strong className="text-slate-900">{run.totalTokens}</strong> • Cost:{' '}
                <strong className="text-emerald-600">${run.estimatedCostUsd}</strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Agent Name</th>
                    <th className="py-2.5 px-4">Duration</th>
                    <th className="py-2.5 px-4">Tokens</th>
                    <th className="py-2.5 px-4">Tools Invoked</th>
                    <th className="py-2.5 px-4">Safe Output Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {run.steps.map((st, sIdx) => (
                    <tr key={sIdx} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                        {st.agentName}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {st.durationMs}ms
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {st.tokens}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {st.toolsUsed.map((tool) => (
                            <span key={tool} className="text-[10.5px] bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded font-mono font-medium">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11.5px] max-w-md">
                        {st.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
