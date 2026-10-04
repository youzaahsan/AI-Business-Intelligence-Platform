import React, { useState } from 'react';
import { Settings, ShieldCheck, Users, Key, Database, Cpu, CheckCircle2, Lock, User, Bell } from 'lucide-react';
import { UserRole } from '../types';

interface AdminSettingsPageProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ userRole, setUserRole }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'ai' | 'rbac' | 'audit'>('general');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [vectorDb, setVectorDb] = useState('chromadb');
  const [temperature, setTemperature] = useState(0.2);

  const rolesList: { role: UserRole; description: string; perms: string[] }[] = [
    { role: 'Admin', description: 'Full access to all agents, user administration, system config, and audit logs.', perms: ['All Permissions'] },
    { role: 'Manager', description: 'Dataset management, workflow execution, document RAG, and reports export.', perms: ['Data Upload', 'Workflows', 'Reports', 'Audit View'] },
    { role: 'Analyst', description: 'Run analytics, trigger multi-agent queries, export executive presentations.', perms: ['Data Read', 'Workflows', 'Reports'] },
    { role: 'User', description: 'Read-only access to published dashboard scorecards and approved reports.', perms: ['Dashboard View', 'Reports View'] }
  ];

  const auditLogs = [
    { timestamp: '2026-10-04 11:30:12', user: 'ahsan@enterprise.ai', action: 'WORKFLOW_EXECUTE', resource: 'task-9a8f21e', status: 'Success' },
    { timestamp: '2026-10-04 11:24:45', user: 'ahsan@enterprise.ai', action: 'DATASET_PROFILE', resource: 'ds-sales-2026', status: 'Success' },
    { timestamp: '2026-10-04 10:55:01', user: 'ahsan@enterprise.ai', action: 'ROLE_POLICY_UPDATE', resource: 'role:Analyst', status: 'Success' },
    { timestamp: '2026-10-04 09:42:18', user: 'manager@enterprise.ai', action: 'DOCUMENT_RAG_INDEX', resource: 'doc-q3-memo', status: 'Success' }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
            <Settings className="w-3.5 h-3.5" />
            <span>Governance & Architecture</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Settings & Administration
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Configure AI models, vector stores, role-based access control, and cryptographic audit telemetry.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl text-right shadow-2xs shrink-0">
          <div className="text-[11px] text-slate-500 font-semibold uppercase">Active User Role</div>
          <div className="text-base font-bold text-blue-600 mt-0.5">{userRole}</div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-medium">
        {[
          { id: 'general', label: 'General & Profile', icon: User },
          { id: 'ai', label: 'AI & Vector Config', icon: Cpu },
          { id: 'rbac', label: 'Roles & Permissions', icon: Users },
          { id: 'audit', label: 'Audit Trail', icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General & Profile */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-5 max-w-2xl">
          <h3 className="text-[14px] font-bold text-slate-900">User Profile Information</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Ahsan Khan"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="ahsan@enterprise.ai"
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Organization</label>
              <input
                type="text"
                defaultValue="Global Enterprise Corp"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="pt-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-2xs">
                Save Profile Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AI & Vector Config */}
      {activeTab === 'ai' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <h3 className="text-[14px] font-bold text-slate-900">AI Model Configuration</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Active LLM Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="gemini-2.5-flash">Google Gemini 2.5 Flash (Recommended)</option>
                  <option value="gemini-2.5-pro">Google Gemini 2.5 Pro (Deep Research)</option>
                  <option value="custom">Self-Hosted Enterprise Endpoint</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-semibold mb-1">
                  <span>Temperature (Creativity vs Determinism)</span>
                  <span className="font-mono text-blue-600">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <span className="text-[10.5px] text-slate-400">0.2 ensures accurate mathematical calculation and source citations</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-600" />
              <h3 className="text-[14px] font-bold text-slate-900">Vector Store Provider</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Vector Index Engine</label>
                <select
                  value={vectorDb}
                  onChange={(e) => setVectorDb(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="chromadb">ChromaDB (Local In-Memory / Edge Store)</option>
                  <option value="qdrant">Qdrant (Distributed Vector Cluster)</option>
                </select>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Vector Store Synchronization</div>
                <div>Collection: <span className="font-mono text-blue-700">nexus_bi_knowledge</span></div>
                <div className="text-emerald-700 flex items-center gap-1 font-medium mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2 documents, 20 chunks indexed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Roles & Permissions */}
      {activeTab === 'rbac' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-bold text-slate-900">Role-Based Access Control (RBAC)</h3>
              <p className="text-[11px] text-slate-500">Click any role to switch your current simulated session permissions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rolesList.map((r) => {
              const isSelected = userRole === r.role;
              return (
                <div
                  key={r.role}
                  onClick={() => setUserRole(r.role)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-100 shadow-2xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{r.role}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-[11.5px] text-slate-500 mt-2 leading-relaxed">{r.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {r.perms.map((p) => (
                      <span key={p} className="text-[9.5px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Audit Trail */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-slate-900">Security & Activity Audit Logs</h3>
            <span className="text-xs text-slate-400">Cryptographically verified</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Timestamp (UTC)</th>
                  <th className="py-2.5 px-4">User</th>
                  <th className="py-2.5 px-4">Action</th>
                  <th className="py-2.5 px-4">Target Resource</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {auditLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-mono text-slate-500">{log.timestamp}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{log.user}</td>
                    <td className="py-3 px-4 font-mono text-blue-700 font-medium">{log.action}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{log.resource}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
