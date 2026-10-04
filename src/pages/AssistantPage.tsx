import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles,
  Database,
  LineChart,
  FileText,
  Clock,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  toolsUsed?: string[];
  metricsCard?: {
    title: string;
    items: { label: string; value: string }[];
  };
  timestamp: string;
}

export const AssistantPage: React.FC<{ initialQuery?: string }> = ({ initialQuery }) => {
  const [conversations] = useState([
    { id: 'c1', title: 'September Profit Margin Analysis', time: 'Today', active: true },
    { id: 'c2', title: 'Q4 Sales Forecast & Rebound', time: 'Today', active: false },
    { id: 'c3', title: 'Enterprise Customer RFM Cohorts', time: 'Yesterday', active: false },
    { id: 'c4', title: 'Hardware Supply Chain Review', time: '3 days ago', active: false },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: "Hello! I am your Multi-Agent Business Intelligence Assistant. Ask me questions about your ledger data, sales trends, margin contractions, customer segments, or research reports.",
      timestamp: '10:00 AM'
    },
    ...(initialQuery ? [{
      id: 'm2',
      sender: 'user' as const,
      text: initialQuery,
      timestamp: '10:01 AM'
    }, {
      id: 'm3',
      sender: 'assistant' as const,
      text: "September net profit contracted by -29.3% ($60,450 down to $42,720) despite revenue only contracting -8.7%. Multi-agent diagnosis isolates SKU-PRO-X1 (margin dropped to 22.8% due to +39% supplier memory costs) and Fiber Interface Kit (3.4% margin due to discount coupon stacking). October sales are projected to rebound to $192,500 (+8.1%).",
      toolsUsed: ['pandas_ledger_aggregator', 'margin_decomposer', 'forecasting_tool'],
      metricsCard: {
        title: 'Diagnostic Decomposition Scorecard',
        items: [
          { label: 'August Net Profit', value: '$60,450' },
          { label: 'September Net Profit', value: '$42,720 (-29.3%)' },
          { label: 'Hardware Margin Drop', value: '33.3% -> 22.8%' },
          { label: 'October ML Forecast', value: '$192,500 (+8.1%)' }
        ]
      },
      timestamp: '10:01 AM'
    }] : [])
  ]);

  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputText;
    if (!q.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: 'm-' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    await new Promise((r) => setTimeout(r, 600));

    const qLower = q.toLowerCase();
    let replyText = '';
    let tools: string[] = ['database_tool', 'calculator_tool'];
    let metricsCard: any = null;

    if (qLower.includes('why') && qLower.includes('profit')) {
      tools = ['pandas_ledger_aggregator', 'margin_decomposer', 'rag_search_tool'];
      replyText =
        "September net profit fell by -29.3% ($60,450 down to $42,720). Root cause analysis isolates two products: " +
        "1) Enterprise Pro X1 (SKU-PRO-X1) gross margin dropped from 33.3% to 22.8% caused by a 39% supplier component cost surcharge. " +
        "2) Ultra-High-Speed Fiber Interface Kit suffered discount stacking on wholesale accounts, dropping margins from 21.9% to 3.4%.";
      metricsCard = {
        title: 'September Margin Decomposition',
        items: [
          { label: 'August Net Profit', value: '$60,450' },
          { label: 'September Net Profit', value: '$42,720 (-29.3%)' },
          { label: 'Hardware Margin Drop', value: '33.3% -> 22.8%' },
          { label: 'Accessory Margin Drop', value: '21.9% -> 3.4%' }
        ]
      };
    } else if (qLower.includes('forecast')) {
      tools = ['forecasting_tool', 'ensemble_regressor'];
      replyText =
        "Our ML Ensemble model projects October sales to rebound to $192,500 (+8.1% MoM). " +
        "The 95% Confidence Interval is [$181,000, $204,000] with a tested MAPE of 2.4%.";
      metricsCard = {
        title: 'Predictive Sales Forecast',
        items: [
          { label: 'October Point Prediction', value: '$192,500' },
          { label: 'Expected Growth vs Sep', value: '+8.1%' },
          { label: '95% Confidence Band', value: '[$181k, $204k]' },
          { label: 'Tested Model MAPE', value: '2.4%' }
        ]
      };
    } else if (qLower.includes('product') || qLower.includes('highest')) {
      tools = ['product_analytics_tool'];
      replyText =
        "The highest margin offering is AI Studio Enterprise Seat License (Software SaaS) at 75.4% gross margin ($33,120 profit on $44,000 revenue in September). " +
        "Conversely, Fiber Interface Kit is currently our lowest margin SKU at 3.4%.";
      metricsCard = {
        title: 'Top vs Bottom Margin SKUs',
        items: [
          { label: 'Top Margin', value: 'AI Studio Seat (75.4%)' },
          { label: 'Top Revenue SKU', value: 'Enterprise Pro X1 ($62.4k)' },
          { label: 'Lowest Margin', value: 'Fiber Kit (3.4%)' }
        ]
      };
    } else {
      tools = ['database_tool', 'data_profiler'];
      replyText =
        `Query evaluated: "${q}". The business intelligence ledger contains 8,230 transactions totaling $1,026,000 in gross revenue and $311,870 in net profit across April-September 2026.`;
    }

    const assistantMsg: ChatMessage = {
      id: 'm-' + Date.now(),
      sender: 'assistant',
      text: replyText,
      toolsUsed: tools,
      metricsCard,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsThinking(false);
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">AI Assistant</h1>
        <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
          Ask questions about your business, data, forecasting, and research.
        </p>
      </div>

      {/* Main Workspace: 2-column split (Matches Section 17) */}
      <div className="h-[calc(100vh-13.5rem)] flex rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Left Sidebar: Conversation History */}
        <div className="w-64 border-r border-slate-200/80 bg-slate-50/50 p-3.5 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs transition">
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              <span>New Conversation</span>
            </button>

            <div className="space-y-1">
              <div className="px-2 pt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Conversation History
              </div>
              {conversations.map((c) => (
                <button
                  key={c.id}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition ${
                    c.active
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="truncate">{c.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-normal">{c.time}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
            <span>4 Saved Sessions</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          </div>
        </div>

        {/* Right Area: Chat Stream + Input */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 max-w-3xl ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-blue-600 border border-slate-200'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Message Body */}
                <div className="space-y-2 max-w-2xl">
                  <div
                    className={`p-3.5 rounded-xl text-xs sm:text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Tool execution pills */}
                  {msg.toolsUsed && msg.toolsUsed.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 px-1">
                      <span className="text-[10.5px] text-slate-400 font-medium">Tools called:</span>
                      {msg.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] bg-slate-100 border border-slate-200 text-blue-700 px-2 py-0.5 rounded font-mono font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Optional metrics card */}
                  {msg.metricsCard && (
                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2 text-xs">
                      <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                        {msg.metricsCard.title}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {msg.metricsCard.items.map((item, idx) => (
                          <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200/80">
                            <div className="text-[10.5px] text-slate-500">{item.label}</div>
                            <div className="font-bold text-slate-900 mt-0.5">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg w-max border border-slate-200">
                <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>AI agents analyzing and calculating...</span>
              </div>
            )}
          </div>

          {/* Suggested Prompts */}
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/40 flex items-center gap-2 overflow-x-auto text-[11.5px] text-slate-600">
            <span className="text-[10px] text-slate-400 uppercase font-semibold shrink-0">Try asking:</span>
            {[
              'Why did profit decrease in September?',
              'Forecast sales for October',
              'Which product has the highest profit margin?'
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-600 transition"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about sales, margins, forecasts, or upload documents..."
              className="flex-1 bg-slate-50/70 focus:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isThinking}
              className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-40 cursor-pointer shadow-2xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
