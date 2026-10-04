import React, { useState } from 'react';
import { Database, Upload, CheckCircle2, AlertTriangle, FileSpreadsheet, Download, RefreshCw, BarChart2 } from 'lucide-react';
import { Dataset } from '../types';

interface DatasetsPageProps {
  datasets: Dataset[];
  onUploadNewDataset: (dataset: any) => void;
}

export const DatasetsPage: React.FC<DatasetsPageProps> = ({ datasets, onUploadNewDataset }) => {
  const [selectedDataset, setSelectedDataset] = useState<Dataset>(datasets[0]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulatedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    await new Promise((r) => setTimeout(r, 500));

    const newDataset: Dataset = {
      id: 'ds-' + Date.now(),
      name: file.name,
      filename: file.name,
      fileType: file.name.endsWith('.xlsx') ? 'xlsx' : (file.name.endsWith('.json') ? 'json' : 'csv'),
      rowCount: Math.floor(Math.random() * 4000) + 1200,
      colCount: 8,
      qualityScore: 98.2,
      missingCells: 6,
      duplicateRows: 0,
      createdAt: new Date().toISOString(),
      columns: [
        { name: 'transaction_id', type: 'string', nulls: 0, unique: 1200 },
        { name: 'date', type: 'date', nulls: 0, unique: 180 },
        { name: 'sku', type: 'string', nulls: 0, unique: 45 },
        { name: 'quantity', type: 'integer', nulls: 0, unique: 20 },
        { name: 'revenue', type: 'float', nulls: 2, unique: 980 },
        { name: 'cost', type: 'float', nulls: 4, unique: 960 },
        { name: 'channel', type: 'string', nulls: 0, unique: 3 },
        { name: 'country', type: 'string', nulls: 0, unique: 12 }
      ]
    };

    onUploadNewDataset(newDataset);
    setSelectedDataset(newDataset);
    setIsUploading(false);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>Data Ingestion & Profiling</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Datasets
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            Upload and profile business datasets with automated schema detection and quality scorecards.
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-[13px] transition shadow-xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Profiling Dataset...' : '+ Upload Dataset'}</span>
            <input
              type="file"
              accept=".csv,.xlsx,.json"
              className="hidden"
              onChange={handleSimulatedUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* Dataset Selection Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
        {datasets.map((ds) => (
          <button
            key={ds.id}
            onClick={() => setSelectedDataset(ds)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition whitespace-nowrap ${
              selectedDataset.id === ds.id
                ? 'bg-blue-50/80 border-blue-300 text-blue-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
            <span>{ds.name}</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
              {ds.rowCount.toLocaleString()} rows
            </span>
          </button>
        ))}
      </div>

      {/* Quality Scorecard (Matches Section 20) */}
      {selectedDataset && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="text-[11.5px] text-slate-500 font-medium">Total Rows</div>
              <div className="text-xl font-bold text-slate-900 mt-1">{selectedDataset.rowCount.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Analysis Ready</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="text-[11.5px] text-slate-500 font-medium">Total Columns</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{selectedDataset.colCount}</div>
              <div className="text-[11px] text-slate-400 mt-1">Schema detected</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="text-[11.5px] text-slate-500 font-medium">Data Quality Score</div>
              <div className="text-xl font-bold text-emerald-600 mt-1">{selectedDataset.qualityScore}%</div>
              <div className="text-[11px] text-slate-400 mt-1">High integrity</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="text-[11.5px] text-slate-500 font-medium">Missing / Duplicates</div>
              <div className="text-xl font-bold text-slate-800 mt-1">
                {selectedDataset.missingCells} / {selectedDataset.duplicateRows}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">&lt;0.05% error rate</div>
            </div>
          </div>

          {/* Column Matrix */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-bold text-slate-900">Detected Schema & Column Profiles</h3>
                <p className="text-[11px] text-slate-500">Column data types, unique cardinalities, and null checks</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Column Name</th>
                    <th className="py-2.5 px-4">Data Type</th>
                    <th className="py-2.5 px-4">Null Count</th>
                    <th className="py-2.5 px-4">Unique Cardinality</th>
                    <th className="py-2.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {selectedDataset.columns.map((col, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">
                        {col.name}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-blue-700 font-mono font-medium">
                          {col.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {col.nulls === 0 ? (
                          <span className="text-emerald-600 font-medium">0</span>
                        ) : (
                          <span className="text-amber-600 font-medium">{col.nulls}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {col.unique.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Valid</span>
                        </span>
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
