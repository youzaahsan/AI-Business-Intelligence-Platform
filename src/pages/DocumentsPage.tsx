import React, { useState } from 'react';
import { FileText, Upload, Search, CheckCircle2, ShieldCheck, ExternalLink, Clock, Trash2, Eye } from 'lucide-react';
import { DocumentRecord } from '../types';

interface DocumentsPageProps {
  documents: DocumentRecord[];
  onUploadDocument: (doc: any) => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({ documents, onUploadDocument }) => {
  const [searchQuery, setSearchQuery] = useState('September profit margin and freight bottleneck causes');
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulatedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    await new Promise((r) => setTimeout(r, 600));

    const newDoc: DocumentRecord = {
      id: 'doc-' + Date.now(),
      title: file.name,
      filename: file.name,
      docType: file.name.split('.').pop() || 'pdf',
      sizeBytes: file.size || 1540000,
      chunkCount: 12,
      vectorIndexed: true,
      uploadedAt: new Date().toISOString(),
      summary: 'Uploaded reference document indexed into semantic vector collection.'
    };

    onUploadDocument(newDoc);
    setIsUploading(false);
  };

  const handleSemanticSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch('/api/v1/documents/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSearchResults(data.data.citations);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Document Intelligence & RAG</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Documents
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Upload and manage your knowledge sources for grounded agent citations.
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-[13px] transition shadow-xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Vectorizing Document...' : '+ Upload Document'}</span>
            <input
              type="file"
              accept=".pdf,.docx,.txt,.csv,.xlsx,.json"
              className="hidden"
              onChange={handleSimulatedUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* Semantic Vector Search Box */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Semantic Knowledge Search (RAG Vector Similarity)
        </label>
        <div className="flex gap-2.5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSemanticSearch()}
            placeholder="Search across uploaded documents..."
            className="flex-1 bg-slate-50/70 focus:bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSemanticSearch}
            disabled={isSearching}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isSearching ? 'Searching...' : 'Search'}</span>
          </button>
        </div>

        {/* Retrieved Citations */}
        {searchResults && (
          <div className="mt-4 space-y-2 pt-3 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Retrieved Grounded Chunks ({searchResults.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {searchResults.map((res, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900">{res.documentTitle}</span>
                    <span className="text-[10.5px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Score: {(res.score * 100).toFixed(0)}% (Page {res.page})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">"{res.snippet}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Documents Table (Matches Section 19: Document, Type, Size, Status, Uploaded, Actions) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-slate-900">Knowledge Repositories</h3>
          <span className="text-xs text-slate-500">{documents.length} documents indexed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Uploaded</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{doc.title}</div>
                        <div className="text-[11px] text-slate-400">{doc.chunkCount} vector chunks</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono uppercase text-slate-500">
                    {doc.docType}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {(doc.sizeBytes / 1024 / 1024).toFixed(2)} MB
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Processed</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSearchQuery(doc.title);
                        handleSemanticSearch();
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                    >
                      Inspect Chunks
                    </button>
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
