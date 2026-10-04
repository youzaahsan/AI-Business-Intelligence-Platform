import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { WorkflowOrchestratorPage } from './pages/WorkflowOrchestratorPage';
import { ResearchPage } from './pages/ResearchPage';
import { AssistantPage } from './pages/AssistantPage';
import { DatasetsPage } from './pages/DatasetsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfitPage } from './pages/ProfitPage';
import { ForecastPage } from './pages/ForecastPage';
import { AnomaliesPage } from './pages/AnomaliesPage';
import { CustomersPage } from './pages/CustomersPage';
import { ProductsPage } from './pages/ProductsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AgentActivityPage } from './pages/AgentActivityPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';

import {
  UserRole,
  MonthlyRecord,
  ProductItem,
  Dataset,
  DocumentRecord,
  AnomalyItem,
  WorkflowResult
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string>('');

  // Core Business Ledger State
  const [monthlyLedger, setMonthlyLedger] = useState<MonthlyRecord[]>([
    { month: 'April 2026', revenue: 142000, cogs: 73840, opex: 22720, grossProfit: 68160, netProfit: 45440, margin: 32.0, orders: 1120 },
    { month: 'May 2026', revenue: 158000, cogs: 80580, opex: 25280, grossProfit: 77420, netProfit: 52140, margin: 33.0, orders: 1240 },
    { month: 'June 2026', revenue: 169000, cogs: 86190, opex: 28730, grossProfit: 82810, netProfit: 54080, margin: 32.0, orders: 1350 },
    { month: 'July 2026', revenue: 184000, cogs: 95680, opex: 31280, grossProfit: 88320, netProfit: 57040, margin: 31.0, orders: 1490 },
    { month: 'August 2026', revenue: 195000, cogs: 101400, opex: 33150, grossProfit: 93600, netProfit: 60450, margin: 31.0, orders: 1610 },
    { month: 'September 2026', revenue: 178000, cogs: 105020, opex: 30260, grossProfit: 72980, netProfit: 42720, margin: 24.0, orders: 1420 }
  ]);

  const [products, setProducts] = useState<ProductItem[]>([
    { sku: 'SKU-PRO-X1', name: 'Enterprise Pro X1 Workstation', category: 'Hardware', augRevenue: 85200, sepRevenue: 62400, augProfit: 28400, sepProfit: 14200, marginAug: 33.3, marginSep: 22.8, problemDriver: true },
    { sku: 'SKU-SRV-200', name: 'Cloud Compute High-Memory Node', category: 'Cloud Infrastructure', augRevenue: 52000, sepRevenue: 54200, augProfit: 18200, sepProfit: 17800, marginAug: 35.0, marginSep: 32.8, problemDriver: false },
    { sku: 'SKU-SFT-L3', name: 'AI Studio Enterprise Seat License', category: 'Software SaaS', augRevenue: 39500, sepRevenue: 44000, augProfit: 29850, sepProfit: 33120, marginAug: 75.6, marginSep: 75.3, problemDriver: false },
    { sku: 'SKU-ACC-09', name: 'Ultra-High-Speed Fiber Interface Kit', category: 'Accessories', augRevenue: 18300, sepRevenue: 17400, augProfit: 4000, sepProfit: 600, marginAug: 21.9, marginSep: 3.4, problemDriver: true }
  ]);

  const [datasets, setDatasets] = useState<Dataset[]>([
    {
      id: 'ds-sales-2026',
      name: 'FY2026 Q2-Q3 Enterprise Sales & Ledger.csv',
      filename: 'enterprise_sales_ledger_2026.csv',
      fileType: 'csv',
      rowCount: 8230,
      colCount: 9,
      qualityScore: 98.6,
      missingCells: 14,
      duplicateRows: 0,
      createdAt: '2026-09-30T10:00:00Z',
      columns: [
        { name: 'order_id', type: 'string', nulls: 0, unique: 8230 },
        { name: 'date', type: 'date', nulls: 0, unique: 183 },
        { name: 'sku', type: 'string', nulls: 0, unique: 24 },
        { name: 'product_name', type: 'string', nulls: 0, unique: 24 },
        { name: 'category', type: 'string', nulls: 0, unique: 4 },
        { name: 'quantity', type: 'integer', nulls: 0, unique: 15 },
        { name: 'revenue', type: 'float', nulls: 2, unique: 6100 },
        { name: 'cost', type: 'float', nulls: 12, unique: 5900 },
        { name: 'region', type: 'string', nulls: 0, unique: 4 }
      ]
    },
    {
      id: 'ds-cust-rfm-2026',
      name: 'Customer Segmentation RFM Cohort.xlsx',
      filename: 'customer_rfm_cohort.xlsx',
      fileType: 'xlsx',
      rowCount: 2450,
      colCount: 7,
      qualityScore: 99.4,
      missingCells: 2,
      duplicateRows: 0,
      createdAt: '2026-09-28T14:20:00Z',
      columns: [
        { name: 'customer_id', type: 'string', nulls: 0, unique: 2450 },
        { name: 'recency_days', type: 'integer', nulls: 0, unique: 120 },
        { name: 'frequency_orders', type: 'integer', nulls: 0, unique: 28 },
        { name: 'monetary_value', type: 'float', nulls: 2, unique: 2100 },
        { name: 'segment', type: 'string', nulls: 0, unique: 6 }
      ]
    }
  ]);

  const [documents, setDocuments] = useState<DocumentRecord[]>([
    {
      id: 'doc-q3-memo',
      title: 'Q3 2026 Executive Financial & Operational Review.pdf',
      filename: 'Q3_2026_Executive_Review.pdf',
      docType: 'pdf',
      sizeBytes: 2450000,
      chunkCount: 14,
      vectorIndexed: true,
      uploadedAt: '2026-09-30T16:00:00Z',
      summary: 'Executive analysis of late Q3 margin compression, supply chain bottlenecks, and product mix shifting.'
    },
    {
      id: 'doc-pricing-memo',
      title: 'Hardware Pricing Strategy & Margin Audit Memo.docx',
      filename: 'Hardware_Pricing_Audit.docx',
      docType: 'docx',
      sizeBytes: 890000,
      chunkCount: 6,
      vectorIndexed: true,
      uploadedAt: '2026-09-29T11:00:00Z',
      summary: 'Internal procurement findings identifying supplier price revisions for enterprise hardware lines.'
    }
  ]);

  const [anomalies] = useState<AnomalyItem[]>([
    { id: 'anom-1', date: '2026-09-14', metric: 'Gross Margin %', expected: 31.5, actual: 24.0, severity: 'Critical', reason: 'Unplanned spot component surcharge (+39%) from semiconductor distributor on SKU-PRO-X1 units.' },
    { id: 'anom-2', date: '2026-09-19', metric: 'Freight COGS', expected: 4800, actual: 11200, severity: 'High', reason: 'Expedited Midwest air cargo required to alleviate fulfillment bottleneck.' },
    { id: 'anom-3', date: '2026-09-24', metric: 'Realized ASP (SKU-ACC-09)', expected: 149.0, actual: 108.0, severity: 'Medium', reason: 'Overlapping promotional coupons applied in bulk checkout.' }
  ]);

  const [workflowRuns, setWorkflowRuns] = useState<WorkflowResult[]>([]);

  // Fetch initial analytics if available
  useEffect(() => {
    fetch('/api/v1/analytics/overview')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.monthlyLedger) {
          setMonthlyLedger(data.data.monthlyLedger);
        }
        if (data.success && data.data?.products) {
          setProducts(data.data.products);
        }
      })
      .catch(() => {
        // Fallback to initial values
      });
  }, []);

  const handleExecuteHeroWorkflow = () => {
    setCurrentTab('agent-runs');
  };

  const handleUploadDataset = (newDs: Dataset) => {
    setDatasets((prev) => [newDs, ...prev]);
  };

  const handleUploadDocument = (newDoc: DocumentRecord) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleAskAssistant = (query: string) => {
    setAssistantInitialQuery(query);
    setCurrentTab('assistant');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* Redesigned Clean White Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Redesigned Compact Top Header */}
        <Navbar
          userRole={userRole}
          setUserRole={setUserRole}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onSearchSelect={(q) => handleAskAssistant(q)}
          onQuickRunHero={() => setCurrentTab('agent-runs')}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          <div className="max-w-[1400px] mx-auto">
            {currentTab === 'dashboard' && (
              <DashboardPage
                monthlyLedger={monthlyLedger}
                products={products}
                onNavigate={setCurrentTab}
                onExecuteHeroWorkflow={() => setCurrentTab('agent-runs')}
                onAskAssistant={handleAskAssistant}
              />
            )}

            {currentTab === 'assistant' && (
              <AssistantPage initialQuery={assistantInitialQuery} />
            )}

            {currentTab === 'research' && (
              <ResearchPage />
            )}

            {currentTab === 'documents' && (
              <DocumentsPage
                documents={documents}
                onUploadDocument={handleUploadDocument}
              />
            )}

            {currentTab === 'datasets' && (
              <DatasetsPage
                datasets={datasets}
                onUploadNewDataset={handleUploadDataset}
              />
            )}

            {currentTab === 'analytics' && (
              <AnalyticsPage
                monthlyLedger={monthlyLedger}
                products={products}
              />
            )}

            {currentTab === 'profit' && (
              <ProfitPage
                monthlyLedger={monthlyLedger}
                products={products}
              />
            )}

            {currentTab === 'forecast' && (
              <ForecastPage
                monthlyLedger={monthlyLedger}
              />
            )}

            {currentTab === 'anomalies' && (
              <AnomaliesPage
                anomalies={anomalies}
              />
            )}

            {currentTab === 'customers' && (
              <CustomersPage />
            )}

            {currentTab === 'products' && (
              <ProductsPage products={products} />
            )}

            {currentTab === 'reports' && (
              <ReportsPage
                report={workflowRuns[0]?.finalReport}
                onExecuteDiagnostic={() => setCurrentTab('agent-runs')}
              />
            )}

            {currentTab === 'agent-runs' && (
              <WorkflowOrchestratorPage />
            )}

            {currentTab === 'settings' && (
              <AdminSettingsPage
                userRole={userRole}
                setUserRole={setUserRole}
              />
            )}

            {currentTab === 'admin' && (
              <AdminSettingsPage
                userRole={userRole}
                setUserRole={setUserRole}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
