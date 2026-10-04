# Multi-Agent Architecture & Specifications

AgentBI deploys 10 specialized autonomous agents working cooperatively through structured message passing and state transformations.

## Agent Specifications

### 1. Supervisor Agent
- **Role**: Workflow controller and task decomposition.
- **Responsibilities**: Analyzes the user's natural language request, classifies user intent, generates an ordered execution plan, dispatches sub-tasks to worker agents, and tracks workflow state.
- **Tools**: Intent classifier, execution graph builder.

### 2. Research Agent
- **Role**: External intelligence and evidence collection.
- **Responsibilities**: Queries external knowledge sources and search engines, gathers corroborating market evidence, cross-checks multiple sources, and returns structured findings.
- **Zero Hallucination Rule**: Every factual claim must include an authentic citation URL or document reference.

### 3. Document Intelligence Agent
- **Role**: Unstructured document parsing and RAG indexing.
- **Responsibilities**: Extracts text and tables from PDF, DOCX, TXT, CSV, and XLSX; segments content into overlapping chunks; and synchronizes chunk embeddings with the vector store.

### 4. Data Analyst Agent
- **Role**: Statistical analysis and data profiling.
- **Responsibilities**: Evaluates distributions, calculates descriptive statistics (mean, median, variance, standard deviation), computes correlation matrices, and identifies trends using Python numerical libraries.

### 5. Business Intelligence Agent
- **Role**: Financial analytics and KPI calculations.
- **Responsibilities**: Computes Revenue, Cost of Goods Sold (COGS), Gross Profit, Net Profit, Profit Margin %, Average Order Value (AOV), and segment growth rates. Isolates product and category margin erosion.

### 6. Forecasting Agent
- **Role**: Machine learning projections.
- **Responsibilities**: Fits predictive models (Linear Regression, Exponential Smoothing, ARIMA) onto historical time series. Returns point forecasts alongside 95% confidence intervals and validation metrics (RMSE, MAE, MAPE).

### 7. Customer Segmentation Agent
- **Role**: Cohort analysis and behavioral segmentation.
- **Responsibilities**: Executes Recency, Frequency, Monetary (RFM) analysis and assigns customers to clusters: High Value, Regular, New, Low Value, At Risk, and Inactive.

### 8. Anomaly Detection Agent
- **Role**: Statistical outlier and anomaly detection.
- **Responsibilities**: Applies Interquartile Range (IQR) and Z-score algorithms across transaction streams and financial KPIs. Categorizes outliers by severity: Low, Medium, High, or Critical.

### 9. Fact Checker Agent
- **Role**: Verification and auditing.
- **Responsibilities**: Verifies all arithmetic computations, checks consistency between agent outputs, audits source citations, and marks unverified statements with low confidence ratings.

### 10. Report Agent
- **Role**: Executive synthesis and document formatting.
- **Responsibilities**: Compiles outputs into an audit-ready executive brief with executive summary, scorecard tables, actionable recommendations, and export-ready payloads (PDF, Excel, CSV, JSON).
