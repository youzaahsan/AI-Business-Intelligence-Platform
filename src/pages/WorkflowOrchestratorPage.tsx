import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  CheckCircle2,
  Clock,
  Cpu,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  RotateCcw,
  Printer,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { WorkflowResult } from '../types';

interface WorkflowOrchestratorProps {
  onSaveReport?: (report: any) => void;
}

const DEFAULT_PROMPT =
  "Analyze my last 6 months of sales, explain why profit decreased in September, identify the products causing the problem, forecast October sales, and give me recommendations.";

export const WorkflowOrchestratorPage: React.FC<WorkflowOrchestratorProps> = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [result, setResult] = useState<WorkflowResult | null>(null);

  const runWorkflow = async () => {
    setIsRunning(true);
    setResult(null);
    setActiveStepIndex(0);

    const agentFlow = [
      'Supervisor Agent',
      'Data Analyst Agent',
      'Business Intelligence Agent',
      'Anomaly Detection Agent',
      'Forecasting Agent',
      'Fact Checker Agent',
      'Report Agent'
    ];

    for (let i = 0; i < agentFlow.length; i++) {
      setActiveStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    try {
      const response = await fetch('/api/v1/workflows/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, workflow_type: 'business_intelligence' })
      });
      const data = await response.json();
      if (data.success && data.data) {
        setResult(data.data);
      }
    } catch (err) {
      console.error('Workflow API Error:', err);
    } finally {
      setIsRunning(false);
      setActiveStepIndex(-1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AgentBI_Executive_Report_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header & Prompt Box */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Agent AI Pipeline</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Autonomous Business Diagnostics & Forecasting
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
              Deconstruct complex business questions into an automated execution plan with verified mathematical tools.
            </p>
          </div>

          <button
            onClick={() => setPrompt(DEFAULT_PROMPT)}
            className="text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition self-start sm:self-auto"
            title="Reset query"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Example</span>
          </button>
        </div>

        {/* Prompt Input Box */}
        <div className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full bg-slate-50/60 focus:bg-white border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none transition"
            placeholder="Type your multi-agent analytical inquiry..."
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11.5px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Supervisor automates 7 worker agents without raw reasoning leakage</span>
            </div>

            <button
              onClick={runWorkflow}
              disabled={isRunning || !prompt.trim()}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-[13px] text-white transition shadow-xs cursor-pointer ${
                isRunning
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Workflow</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            <h2 className="text-[14px] font-bold text-slate-900">Agent Orchestration Sequence</h2>
          </div>
          <span className="text-[11.5px] text-slate-500">
            {isRunning ? 'Execution in progress...' : result ? 'All agents completed successfully' : 'Ready to execute'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {[
            { name: 'Supervisor', desc: 'Task Planner' },
            { name: 'Data Analyst', desc: 'Ledger Profiler' },
            { name: 'BI Agent', desc: 'Margin Health' },
            { name: 'Anomaly', desc: 'Outlier Detector' },
            { name: 'Forecasting', desc: 'ML Regressor' },
            { name: 'Fact Checker', desc: 'Audit & Verify' },
            { name: 'Report Agent', desc: 'Synthesis' }
          ].map((agent, index) => {
            const isCompleted = result !== null;
            const isCurrentlyActive = isRunning && activeStepIndex === index;
            const isPastActive = isRunning && activeStepIndex > index;

            let nodeStyle = 'border-slate-200 bg-slate-50/50 text-slate-400';
            if (isCompleted || isPastActive) {
              nodeStyle = 'border-emerald-200 bg-emerald-50/60 text-emerald-800';
            } else if (isCurrentlyActive) {
              nodeStyle = 'border-blue-400 bg-blue-50 text-blue-800 ring-2 ring-blue-100';
            }

            return (
              <div
                key={agent.name}
                className={`p-3 rounded-lg border text-center flex flex-col justify-between h-22 transition-all ${nodeStyle}`}
              >
                <div className="flex items-center justify-center">
                  {isCompleted || isPastActive ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrentlyActive ? (
                    <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 truncate">{agent.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{agent.desc}</div>
                </div>
                <div className="text-[9.5px] font-semibold uppercase tracking-wider">
                  {isCompleted || isPastActive ? 'Done' : isCurrentlyActive ? 'Active' : 'Queued'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Report & Findings Card */}
      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
            {/* Report Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {result.finalReport.title}
                  </h3>
                  <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
                <div className="text-[11.5px] text-slate-500 mt-1">
                  Confidence Score: <strong className="text-slate-900 font-mono">{(result.finalReport.confidenceScore * 100).toFixed(0)}%</strong> • Latency: <strong className="text-slate-900 font-mono">{result.totalDurationMs}ms</strong> • Tokens: <strong className="text-slate-900 font-mono">{result.totalTokens}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
                <button
                  onClick={handleDownloadJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-blue-700 border border-blue-200 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Executive Synthesis
              </div>
              <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
                {result.finalReport.executiveSummary}
              </p>
            </div>

            {/* Financial Scorecard Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Ledger Diagnostic Scorecard
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                  <div className="text-[11px] text-slate-500">6-Month Gross Revenue</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">{result.finalReport.financialScorecard.sixMonthRevenue}</div>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                  <div className="text-[11px] text-slate-500">August Peak Revenue</div>
                  <div className="text-base font-bold text-blue-600 mt-0.5">{result.finalReport.financialScorecard.augustRevenue}</div>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                  <div className="text-[11px] text-slate-500">September Revenue</div>
                  <div className="text-base font-bold text-amber-600 mt-0.5">{result.finalReport.financialScorecard.septemberRevenue}</div>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                  <div className="text-[11px] text-slate-500">September Net Profit</div>
                  <div className="text-base font-bold text-rose-600 mt-0.5">{result.finalReport.financialScorecard.septemberProfit}</div>
                </div>
              </div>
            </div>

            {/* Problem Products Diagnosed */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>Diagnosed Problem Products (Root Causes)</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.finalReport.problemProducts.map((prod) => (
                  <div key={prod.sku} className="p-4 rounded-xl bg-rose-50/40 border border-rose-200/80 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-xs sm:text-[13px] text-slate-900">{prod.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{prod.sku}</div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                        {prod.marginDrop}
                      </span>
                    </div>
                    <div className="text-xs text-rose-800 font-medium">
                      {prod.impact}
                    </div>
                    <div className="text-[11.5px] text-slate-600 bg-white p-2.5 rounded-lg border border-rose-100">
                      <strong>Root Cause:</strong> {prod.rootCause}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Prioritized Action Roadmap
              </h4>
              <div className="space-y-2">
                {result.finalReport.strategicRecommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        rec.priority.includes('Immediate')
                          ? 'bg-rose-100 text-rose-700'
                          : rec.priority.includes('High')
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {rec.priority}
                      </span>
                      <span className="font-medium text-slate-800">{rec.action}</span>
                    </div>
                    <div className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded whitespace-nowrap self-start sm:self-auto">
                      Impact: {rec.expectedImpact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Safe Agent Execution Telemetry Table */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-bold text-slate-900">Safe Execution Telemetry</h3>
                <p className="text-[11px] text-slate-500">Latency, tokens, and deterministic tools called per agent node</p>
              </div>
              <span className="font-mono text-xs text-slate-400">{result.taskId}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Agent</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Duration</th>
                    <th className="py-2.5 px-3">Tokens</th>
                    <th className="py-2.5 px-3">Tools Invoked</th>
                    <th className="py-2.5 px-3">Output Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {result.steps.map((step, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                        {step.agentName}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Done</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">
                        {step.durationMs}ms
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">
                        {step.tokens}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex flex-wrap gap-1">
                          {step.toolsUsed.map((tool) => (
                            <span key={tool} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-[11.5px] text-slate-600 max-w-md">
                        {step.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
