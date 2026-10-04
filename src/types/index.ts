export type UserRole = 'Admin' | 'Manager' | 'Analyst' | 'User';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  organization: string;
}

export interface AgentStep {
  agentName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  durationMs: number;
  tokens: number;
  toolsUsed: string[];
  summary: string;
}

export interface ProblemProduct {
  sku: string;
  name: string;
  impact: string;
  marginDrop: string;
  rootCause: string;
}

export interface StrategicRecommendation {
  priority: string;
  action: string;
  expectedImpact: string;
}

export interface WorkflowReport {
  title: string;
  timestamp: string;
  query: string;
  executiveSummary: string;
  financialScorecard: {
    sixMonthRevenue: string;
    sixMonthNetProfit: string;
    averageGrossMargin: string;
    augustRevenue: string;
    septemberRevenue: string;
    septemberProfit: string;
    octoberForecast: string;
  };
  problemProducts: ProblemProduct[];
  strategicRecommendations: StrategicRecommendation[];
  confidenceScore: number;
  verificationStatus: string;
}

export interface WorkflowResult {
  taskId: string;
  status: string;
  prompt: string;
  plan: string[];
  steps: AgentStep[];
  finalReport: WorkflowReport;
  totalDurationMs: number;
  totalTokens: number;
  estimatedCostUsd: string;
}

export interface DatasetColumn {
  name: string;
  type: string;
  nulls: number;
  unique: number;
  isNumeric?: boolean;
  mean?: number;
}

export interface Dataset {
  id: string;
  name: string;
  filename: string;
  fileType: string;
  rowCount: number;
  colCount: number;
  qualityScore: number;
  missingCells: number;
  duplicateRows: number;
  createdAt: string;
  columns: DatasetColumn[];
}

export interface DocumentRecord {
  id: string;
  title: string;
  filename: string;
  docType: string;
  sizeBytes: number;
  chunkCount: number;
  vectorIndexed: boolean;
  uploadedAt: string;
  summary: string;
}

export interface AnomalyItem {
  id: string;
  date: string;
  metric: string;
  expected: number;
  actual: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  reason: string;
}

export interface CustomerSegmentItem {
  name: string;
  count: number;
  pct: number;
  revenue: number;
  avgSpend: number;
  churnRisk: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ProductItem {
  sku: string;
  name: string;
  category: string;
  augRevenue: number;
  sepRevenue: number;
  augProfit: number;
  sepProfit: number;
  marginAug: number;
  marginSep: number;
  problemDriver: boolean;
}

export interface MonthlyRecord {
  month: string;
  revenue: number;
  cogs: number;
  opex: number;
  grossProfit: number;
  netProfit: number;
  margin: number;
  orders: number;
}
