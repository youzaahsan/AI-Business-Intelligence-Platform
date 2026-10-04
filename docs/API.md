# REST API Specification (V1)

All endpoints conform to the standard `ApiResponse` envelope:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "request_id": "req-20261004120000"
}
```

## Key Endpoints

### Authentication & Users
- `POST /api/v1/auth/login`: Authenticate email/password and obtain JWT access token.
- `POST /api/v1/auth/register`: Create a new user profile with role assignment.
- `GET /api/v1/auth/me`: Retrieve currently authenticated session.

### Multi-Agent Workflows
- `POST /api/v1/workflows/run`: Execute an autonomous multi-agent analytical pipeline.
  - Body: `{"prompt": "Analyze my last 6 months of sales...", "workflow_type": "business_intelligence"}`
  - Returns: Execution plan, agent step logs, verified findings, and final report.

### Grounded AI Research
- `POST /api/v1/research/query`: Conduct multi-source research across web, files, and database.
  - Body: `{"topic": "Semiconductor supply lead times", "depth": "Deep", "sources": ["external", "documents"]}`
  - Returns: Structured findings, verified citations, confidence score.

### Datasets & Profiling
- `GET /api/v1/datasets`: List available datasets and quality scores.
- `POST /api/v1/datasets/upload`: Upload CSV/Excel dataset and trigger automated data profiling.

### Document Intelligence & RAG
- `POST /api/v1/documents/upload`: Upload PDF/DOCX/TXT for chunking and vector indexing.
- `POST /api/v1/documents/search`: Query semantic vector store and retrieve chunk citations.

### Analytics & Forecasting
- `GET /api/v1/analytics/overview`: High-level executive KPI scorecard.
- `POST /api/v1/forecast/generate`: Generate ML projections with 95% confidence intervals.
- `GET /api/v1/anomalies`: Retrieve detected ledger and KPI anomalies.
- `GET /api/v1/customers/segments`: Get RFM clusters and customer value distributions.
