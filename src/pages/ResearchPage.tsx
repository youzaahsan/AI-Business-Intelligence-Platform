import React, { useState } from 'react';
import { Search, Globe, FileText, Database, ShieldCheck, ExternalLink, CheckCircle2, Sparkles, Clock } from 'lucide-react';

export const ResearchPage: React.FC = () => {
  const [topic, setTopic] = useState('Semiconductor component price trends and freight cost inflation impact on hardware margins');
  const [depth, setDepth] = useState<'Quick' | 'Standard' | 'Deep'>('Standard');
  const [sources, setSources] = useState({
    external: true,
    documents: true,
    database: true,
    knowledgeBase: true
  });
  const [isSearching, setIsSearching] = useState(false);
  const [progressStep, setProgressStep] = useState<number>(-1);
  const [researchData, setResearchData] = useState<any>(null);

  const startResearch = async () => {
    setIsSearching(true);
    setResearchData(null);
    setProgressStep(0);

    const steps = [
      'Supervisor Agent: Task decomposition & query analyzed',
      'Research Agent: Multi-source web & document collection',
      'Source Analysis: Cross-corroboration & credibility scoring',
      'Fact Checker: Audit against ledger numbers',
      'Report Agent: Synthesis of intelligence dossier'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProgressStep(i);
      await new Promise((r) => setTimeout(r, 400));
    }

    try {
      const activeSources = Object.keys(sources).filter((k) => (sources as any)[k]);
      const res = await fetch('/api/v1/research/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, depth, sources: activeSources })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setResearchData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
      setProgressStep(-1);
    }
  };

  const progressLabels = [
    'Supervisor Agent',
    'Research Agent',
    'Source Analysis',
    'Fact Checker',
    'Report Agent'
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header & Input Panel */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
            <Search className="w-3.5 h-3.5" />
            <span>Autonomous Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI Research
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Research any topic with multi-agent intelligence across web, uploaded documents, and internal datasets.
          </p>
        </div>

        {/* Query Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            What would you like to research?
          </label>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-50/60 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g. Memory chip market supply constraints in Q3..."
            />
          </div>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Depth Options */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Research Depth
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Quick', 'Standard', 'Deep'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDepth(d)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition ${
                    depth === d
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Sources Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Source Filters
            </label>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700">
              <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
                <input
                  type="checkbox"
                  checked={sources.external}
                  onChange={(e) => setSources({ ...sources, external: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Web</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
                <input
                  type="checkbox"
                  checked={sources.documents}
                  onChange={(e) => setSources({ ...sources, documents: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Documents</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
                <input
                  type="checkbox"
                  checked={sources.database}
                  onChange={(e) => setSources({ ...sources, database: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Datasets</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
                <input
                  type="checkbox"
                  checked={sources.knowledgeBase}
                  onChange={(e) => setSources({ ...sources, knowledgeBase: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Knowledge Base</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={startResearch}
            disabled={isSearching || !topic.trim()}
            className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-[13px] text-white transition shadow-xs cursor-pointer ${
              isSearching
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSearching ? 'Conducting Deep Research...' : 'Start Research'}
          </button>
        </div>
      </div>

      {/* Progress Section (Matches Section 18 spec) */}
      {(isSearching || progressStep >= 0) && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Agent Progress Pipeline
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {progressLabels.map((lbl, idx) => {
              const isDone = progressStep > idx || (!isSearching && researchData !== null);
              const isCurrent = isSearching && progressStep === idx;
              return (
                <div
                  key={lbl}
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between transition ${
                    isDone
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : isCurrent
                      ? 'border-blue-400 bg-blue-50 text-blue-800 font-semibold ring-2 ring-blue-100'
                      : 'border-slate-200 bg-slate-50/50 text-slate-400'
                  }`}
                >
                  <span className="truncate">{lbl}</span>
                  {isDone ? (
                    <span className="text-emerald-600 font-bold ml-1">✓</span>
                  ) : isCurrent ? (
                    <span className="text-blue-600 font-bold ml-1 animate-pulse">●</span>
                  ) : (
                    <span className="text-slate-300 ml-1">○</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Dossier */}
      {researchData && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Research Dossier: {researchData.topic}</h2>
              <div className="text-[11.5px] text-slate-500 mt-0.5">
                Depth: <strong className="text-slate-800">{researchData.depth}</strong> • Confidence:{' '}
                <strong className="text-emerald-600 font-mono">{(researchData.confidenceScore * 100).toFixed(0)}%</strong>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Grounded Evidence</span>
            </span>
          </div>

          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Executive Summary
            </span>
            <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
              {researchData.executiveSummary}
            </p>
          </div>

          {/* Key Findings */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Key Findings
            </h3>
            <div className="space-y-2">
              {researchData.findings?.map((f: string, i: number) => (
                <div key={i} className="p-3 rounded-lg bg-white border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sources & Citations */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Sources & Evidence Citations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {researchData.citations?.map((c: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">{c.title}</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        {(c.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 italic mt-2">"{c.snippet}"</p>
                  </div>
                  {c.sourceUrl && (
                    <a
                      href={c.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 pt-2 border-t border-slate-200"
                    >
                      <span>View Source Evidence</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
