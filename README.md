# AgentBI: Multi-Agent AI Research and Business Intelligence Platform

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Vite-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

A full-stack prototype of an AI-assisted business intelligence platform. It pairs a React dashboard with a multi-agent analysis pipeline, a RAG-style document search layer, and a small set of forecasting, anomaly-detection, and customer-segmentation routines, all organized around one question a business user might ask:

> *"Analyze my last 6 months of sales, explain why profit decreased in September, identify the products causing the problem, forecast October sales, and give me recommendations."*

> [!IMPORTANT]
> **Read this first: what this project is today.** AgentBI is a **demonstration-stage prototype**. The architecture, data model, UI, and agent pipeline are in place, but most analytical output is produced from **built-in sample data (a fictional April to September 2026 ledger)** rather than from uploaded datasets, a live vector database, or a live LLM. Section [2](#2-project-status-at-a-glance) shows exactly what is real, what is simulated, and what is only planned. Nothing in this README claims more than the code does.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Project Status at a Glance](#2-project-status-at-a-glance)
3. [Objectives](#3-objectives)
4. [Key Features](#4-key-features)
5. [Multi-Agent Workflow](#5-multi-agent-workflow)
6. [System Architecture](#6-system-architecture)
7. [Technology Stack](#7-technology-stack)
8. [Project Structure](#8-project-structure)
9. [Database Architecture](#9-database-architecture)
10. [Authentication, Authorization and Security](#10-authentication-authorization-and-security)
11. [Environment Configuration](#11-environment-configuration)
12. [Installation and Running](#12-installation-and-running)
13. [Docker](#13-docker)
14. [API Reference](#14-api-reference)
15. [Background Processing](#15-background-processing)
16. [Machine Learning Pipeline](#16-machine-learning-pipeline)
17. [AI Safety and Reliability](#17-ai-safety-and-reliability)
18. [Performance](#18-performance)
19. [Testing](#19-testing)
20. [Continuous Integration](#20-continuous-integration)
21. [Screenshots](#21-screenshots)
22. [Troubleshooting](#22-troubleshooting)
23. [Known Limitations](#23-known-limitations)
24. [Roadmap](#24-roadmap)
25. [Contributing](#25-contributing)
26. [Security Reporting](#26-security-reporting)
27. [License](#27-license)
28. [Project Vision](#28-project-vision)

---

## 1. Overview

### What it is

AgentBI is a business intelligence application built around **specialized AI agents** that cooperate on a shared workflow state. Instead of showing a fixed set of charts, it is designed to take a plain-language business question, build an execution plan, run analysis steps (KPIs, product margins, anomalies, forecast), verify the claims, and produce a structured executive report.

### The problem it targets

Business teams usually answer questions like "why did profit drop last month?" by hopping between spreadsheets, BI dashboards, internal memos, and market research. AgentBI explores putting those steps behind one interface, with each step recorded and inspectable.

### How it works at a high level

1. A user asks a question (from the **Workflow Orchestrator** or **AI Assistant** pages).
2. A **Supervisor Agent** produces an execution plan.
3. Worker agents run in sequence over a shared, typed `AgentState`: data analysis, business intelligence, anomaly detection, forecasting, fact checking, and reporting.
4. Calculations are done by code-based tools (statistics, linear regression, z-score detection), not by LLM arithmetic.
5. A **Report Agent** assembles an executive report with findings, a forecast, and prioritized recommendations.
6. The React dashboard presents the results alongside KPIs, charts, product tables, anomaly lists, customer segments, and a step-by-step agent activity log.

### How it differs from a traditional dashboard or a simple chatbot

| | Traditional dashboard | Simple AI chatbot | AgentBI (design intent) |
|---|---|---|---|
| Input | Pre-built filters | Free text | Free text plus structured business data |
| Calculations | Fixed queries | Often LLM-generated | Code-based tools, with an explicit verification step |
| Process visibility | None | Opaque | Per-agent step log: status, tools, duration |
| Output | Charts | Prose | Structured report: findings, forecast, anomalies, recommendations |

### Who can use it

Developers and reviewers evaluating a multi-agent BI architecture; students and educators studying AI/ML application design; and teams who want a starting point for a more complete BI assistant.

---

## 2. Project Status at a Glance

**Legend**

- ✅ **Implemented**: real logic exists in the code.
- 🧪 **Demo**: the feature runs end to end but returns **sample or static data**, or simulates behavior.
- 🗺️ **Not implemented**: appears only in configuration, dependency lists, or documentation. See the [Roadmap](#24-roadmap).

| Capability | Status | What the code actually does |
|---|---|---|
| React dashboard (15 pages) | ✅ UI, 🧪 data | Full UI with navigation, charts, tables, and filters. Business data is embedded sample data. |
| Multi-agent workflow (Python) | 🧪 | 7 agents run sequentially over a typed `AgentState`. Agent outputs are largely hard-coded sample results. |
| Multi-agent workflow (Express) | 🧪 | `POST /api/v1/workflows/run` returns a pre-built step log and report. If `GEMINI_API_KEY` is set, Gemini writes the executive summary text. |
| AI research | 🧪 | Returns static findings and citations. Gemini writes the summary text if a key is set. |
| Document upload and parsing | 🗺️ | The upload button in the UI is simulated. No file parsing is implemented. |
| RAG retrieval | 🧪 | An in-memory store with word-overlap scoring over two seeded sample documents. No embeddings. |
| Vector database (ChromaDB / Qdrant) | 🗺️ | Present in `requirements.txt` and config only. |
| GraphRAG | 🗺️ | A design note in `docs/GRAPHRAG.md`. No code. |
| Forecasting | ✅ / 🧪 | Pure-Python linear regression with 95% intervals and RMSE/MAE/MAPE. The UI and agent display fixed forecast values. |
| Anomaly detection | ✅ / 🧪 | A z-score detector with severity levels exists. The agent and UI use a static anomaly list. |
| Customer segmentation | ✅ / 🧪 | A rule-based RFM segmenter exists. The UI shows static segments. |
| Dataset profiling | ✅ | `DataProfiler` computes row/column counts, nulls, uniques, duplicates, and a quality score. It is not exposed through an endpoint. |
| Reports | 🧪 | Report view with CSV download and browser print-to-PDF. |
| Authentication | 🧪 | Login and register endpoints are mocks. JWT and password utilities exist but are not wired into routes. |
| RBAC | ✅ definitions, 🗺️ enforcement | Roles and permissions are defined. Nothing enforces them yet. |
| Database models | ✅ defined, 🗺️ connected | 14 SQLAlchemy models. No route uses them, and there are no migrations. |
| Background tasks | 🧪 | An in-memory task registry. No Celery app is defined. |
| Docker Compose | 🧪 | Compose file exists but references a `Dockerfile` that is not in the repo. See [Docker](#13-docker). |
| CI pipeline | 🗺️ | No `.github/workflows` directory. |
| Automated tests | ✅ | 6 passing unit tests. |

> The `docs/` folder describes the *intended* design and is ahead of the code in places (for example `GRAPHRAG.md`, `CI_CD.md`, and `DOCKER.md` describe components that are not in the repository). Where they differ, **this README reflects the code**.

---

## 3. Objectives

- Explore a **multi-agent pattern** for business analysis: plan, analyze, verify, report.
- Keep calculations **deterministic and testable** by routing them through code tools rather than LLM output.
- Provide a **single dashboard** for KPIs, product performance, anomalies, forecasts, customer segments, documents, and reports.
- Show the shape of a **RAG-backed document search** with source citations.
- Record **agent activity** (agent, status, tools, duration, tokens) so a run can be reviewed.
- Define a **data model and RBAC scheme** that a production version could build on.

---

## 4. Key Features

### 4.1 Multi-Agent AI

Seven agents are implemented in `app/agents/agents.py`. All inherit from `BaseAgent` (`app/agents/base.py`) and expose `async run(state) -> state`. They communicate **only through the shared `AgentState`** (a Pydantic model with fields for the plan, datasets, analysis results, forecasts, anomalies, insights, verification results, final report, errors, step history, tokens, and duration).

| Agent | Purpose | Reads | Writes | What it really does |
|---|---|---|---|---|
| **Supervisor** | Create the execution plan | `original_query` | `plan` | Writes a fixed 6-step plan. It does not yet parse the query. |
| **Data Analyst** | Profile revenue and compute statistics | n/a | `analysis_results` | Runs `PythonAnalysisTool.calculate_statistics` (count, mean, median, std dev, min, max) over an embedded 6-month ledger. |
| **Business Intelligence** | Diagnose product margins | n/a | `analysis_results`, `insights` | Records an embedded product-performance breakdown and an insight about the main drivers. |
| **Anomaly Detection** | Flag unusual events | n/a | `anomalies` | Returns two static anomalies. The `AnomalyDetector` class is not called here. |
| **Forecasting** | Project next-period revenue | `analysis_results` | `forecasts` | Calls `ForecastingTool` (linear regression), but the stored October figures and metrics are hard-coded. The "Ensemble (Ridge + Holt-Winters)" label is descriptive only; those models are not implemented. |
| **Fact Checker** | Verify claims | n/a | `verification_results` | Returns a static list of "Verified" claims. No re-computation is performed. |
| **Report** | Assemble the executive report | n/a | `final_report` | Builds a structured report (summary, metrics, root causes, recommendations, confidence). |

The platform's original design also called for **Research**, **Document Intelligence**, and **Customer Segmentation** agents. Their underlying helpers exist (`ResearchTool`, `RagSearchTool`, `CustomerSegmenter`), but **no agent classes** wrap them yet.

**Tools** (`app/tools/tools.py`) return a typed `ToolResult` and each declares a `required_permission`, which is not yet enforced:

| Tool | Behavior |
|---|---|
| `CalculatorTool` | Evaluates arithmetic expressions with a restricted namespace. |
| `PythonAnalysisTool` | Descriptive statistics over a list of numbers (real computation). |
| `ForecastingTool` | Ordinary least-squares trend projection (real computation). |
| `RagSearchTool` | Returns canned citations (simulated retrieval). |
| `ResearchTool` | Returns canned findings (simulated research). |

### 4.2 AI Research 🧪

`POST /api/v1/research/query` accepts a `topic`, a `depth` (the schema documents `Quick`, `Standard`, `Deep`; the default is `Standard`), and a list of `sources`. The response contains an executive summary, key findings, citations with confidence values, and an overall confidence score.

- In the **Express server**, the summary text comes from Gemini when `GEMINI_API_KEY` is configured; otherwise a built-in summary is used.
- **Findings and citations are static sample content.** The source titles and URLs are placeholders and are **not live web sources**. No web-search integration is implemented (`WEB_SEARCH_*` settings are placeholders).
- Source collection, evidence extraction, source comparison, and research history are not implemented.

### 4.3 Document Intelligence 🧪

The Documents page lists two sample documents (a PDF and a DOCX) with chunk counts and an "indexed" flag, and offers a retrieval search box backed by `POST /api/v1/documents/search`.

- Upload is **simulated** in the browser (a short timeout adds a record to the list). **No file is parsed**, validated, or stored.
- `python-docx`, `pypdf`, and `openpyxl` are listed as dependencies but are not used in the code.

### 4.4 RAG Architecture 🧪

`app/rag/rag_pipeline.py` implements the building blocks of a retrieval pipeline, with the heavy components stubbed:

```text
Text  ->  DocumentChunker (word-based, 400 words, 50 overlap)
      ->  InMemoryVectorStore.add_document (chunk + metadata)
      ->  InMemoryVectorStore.search (word-overlap score, top-k)
      ->  Ranked chunks with similarity score and source title
```

| Aspect | Status |
|---|---|
| Chunking with overlap | ✅ |
| Chunk metadata (`doc_id`, `title`, `chunk_index`, `metadata`) | ✅ |
| Top-k retrieval with a score | 🧪 Keyword overlap, plus a fixed boost for chunks mentioning terms like "profit" or "sales". This is **not semantic search**. |
| Embeddings, reranking, LLM answer synthesis | 🗺️ |
| ChromaDB / Qdrant integration | 🗺️ (`VECTOR_DB_PROVIDER=chromadb` is a configuration default only) |
| Metadata filtering, versioning, deletion | 🗺️ |

The router imports the store but does not use it; the live `/documents/search` endpoints return canned citations.

### 4.5 GraphRAG 🗺️

Not implemented. `docs/GRAPHRAG.md` proposes an entity and relationship model (Customer, Product, Category, Supplier, Transaction, Document, Company, Anomaly) and hybrid vector-plus-graph retrieval. The relational schema in [Section 9](#9-database-architecture) provides some of the underlying entities (customers, products, transactions, documents), but there is **no graph store, entity extraction, or graph traversal code**.

### 4.6 Business Intelligence 🧪

Sample ledger metrics available in the UI and APIs:

- Revenue, COGS, operating expense, gross profit, net profit, margin, and order count per month.
- Six-month revenue (**$1,026,000**) and net profit (**$311,870**), computed from the embedded April to September 2026 sample.
- Month-over-month growth, product-level margin comparison (August vs. September), category share, and regional performance.

```text
Sample ledger  ->  KPIs  ->  Product/margin diagnosis  ->  Insights  ->  Recommendations
```

### 4.7 Analytics Dashboard ✅ UI / 🧪 data

A React 19 single-page app (`src/`) with these pages:

| Page | Purpose |
|---|---|
| Dashboard | KPI cards and the revenue/profit overview chart |
| Workflow Orchestrator (sidebar item "Agent Runs") | Run the multi-agent workflow and view its plan, steps, and report |
| AI Assistant | Chat-style interface (see [4.12](#412-ai-assistant)) |
| Research | Submit a research topic and view the result |
| Documents | Sample document list and retrieval search |
| Datasets | Sample dataset list with column profiles and quality scores |
| Analytics, Profit | Revenue, cost, and profit views |
| Forecast | Historical series plus forecast band with algorithm and horizon controls |
| Anomalies | Anomaly list with a severity filter |
| Customers | Segment cards and a customer table with segment filter and search |
| Products | Product table with search and category filter |
| Reports | Executive report view |
| Agent Activity | Step-log view of workflow runs. The component exists but is **imported and not currently routed** in `App.tsx` |
| Admin Settings ("Settings" and "Admin" items) | General, AI, roles, and audit-trail tabs (sample content) |

Implementation notes (verified in source):

- Charts are **custom SVG components** (`src/components/Charts.tsx`); no charting library is used.
- Navigation uses a sidebar with a mobile toggle; layout uses Tailwind CSS utilities.
- Filtering and search are client-side (products, customers, anomalies). **Pagination is not implemented.**
- Loading spinners exist on the workflow and assistant views. Error handling on API calls is limited to `console.error`.
- The frontend calls only **four** API endpoints: `analytics/overview`, `workflows/run`, `research/query`, and `documents/search`. Everything else is rendered from data embedded in the frontend.

### 4.8 Forecasting

Implemented in `app/ml/analytics_engine.py` (`MLForecaster.forecast_sales`):

- Ordinary least-squares linear regression over an index of periods.
- 95% prediction interval from the residual RMSE.
- In-sample RMSE, MAE, and MAPE.
- Requires at least 3 historical points.

The Express forecast endpoint fits a linear trend and then applies **hard-coded seasonal multipliers** and a fixed ±6% band; its reported error metrics are constants. The UI's algorithm selector (`ensemble`, `linear`, `holt_winters`) does not change the displayed series.

Not implemented: Holt-Winters, ARIMA, Prophet, Ridge, Random Forest, gradient boosting, train/test splits, and model selection. The `ForecastRequest.algorithm` field accepts `linear_regression`, `exponential_smoothing`, or `arima` as documentation, but only linear regression runs.

### 4.9 Anomaly Detection

`AnomalyDetector.detect_anomalies` flags points whose **z-score** exceeds a threshold (default 1.8). Severity is assigned by z-score: **Medium** (≥ threshold), **High** (≥ 2.0), **Critical** (≥ 2.5). There is no "Low" level in the detector. The agent and UI display static sample anomalies (a September 14 margin drop, a freight cost spike, and an average-selling-price drop).

### 4.10 Customer Segmentation

`CustomerSegmenter.segment_customers` assigns each customer to **High Value, Regular, New, Low Value, At Risk,** or **Inactive** using rule-based thresholds on recency, frequency, and monetary value, and produces a three-digit RFM score string. **K-Means and hierarchical clustering are not implemented**. The Customers page shows static sample segment counts.

### 4.11 Automated Reports 🧪

- The Report Agent builds a structured report: title, period, executive summary, key metrics, root-cause diagnosis, strategic recommendations, and confidence score.
- The Reports page supports **CSV export** (client-side download) and **print to PDF** via the browser's print dialog.
- XLSX and JSON export are listed as strings in the report payload but are **not implemented**.

### 4.12 AI Assistant

The Assistant page is a chat-style UI. It currently answers by **matching keywords in the question** (for example "why" plus "profit", or "forecast") and returning pre-written responses after a short delay. It does **not** call an LLM, tools, or agents, and does not select tools automatically. Example prompts it is built around:

```text
Why did profit decrease in September?
Forecast next month's sales.
Which products caused the margin drop?
Generate a business report.
```

---

## 5. Multi-Agent Workflow

The Python orchestrator (`app/workflows/orchestrator.py`) runs the agents **strictly in sequence**:

```mermaid
flowchart TD
    U([User prompt]) --> API["POST /api/v1/workflows/run"]
    API --> O[WorkflowOrchestrator]
    O --> S[Supervisor Agent]
    S --> A[Data Analyst Agent]
    A --> B[Business Intelligence Agent]
    B --> N[Anomaly Detection Agent]
    N --> F[Forecasting Agent]
    F --> C[Fact Checker Agent]
    C --> R[Report Agent]
    R --> OUT([plan + step_history + final_report])

    ST[("AgentState (shared, typed)")] -.-> S
    ST -.-> R
```

| Orchestration concern | Status |
|---|---|
| Task planning | 🧪 Fixed plan written by the Supervisor |
| Agent selection / routing | 🗺️ All agents always run, in a fixed order |
| Shared typed state | ✅ `AgentState` |
| Parallel execution | 🗺️ |
| Retries, timeouts, cancellation | 🗺️ |
| Failure recovery / partial results | 🗺️ (`AgentState.errors` exists but is unused) |
| Status tracking | 🧪 Each step records `status: completed`, duration, and tokens |
| Execution log | ✅ `step_history` entries (agent, status, duration, tokens, tools, summary) |

> Durations and token counts in the step log are **illustrative constants**, not measurements of real LLM calls. The Express server exposes the same flow at the same path with its own pre-built step log.

---

## 6. System Architecture

The repository contains **two independent server runtimes**. The React UI talks to the **Express server**; the **FastAPI backend** is a standalone service that mirrors part of the API and holds the agent, ML, RAG, and database code.

```mermaid
flowchart LR
    Browser["Browser: React 19 SPA"] -->|"/api/v1/* (4 endpoints used)"| Express["server.ts: Express + Vite middleware, port 3000"]
    Express --> Mem[("In-memory sample data")]
    Express -.->|"optional, if GEMINI_API_KEY set"| Gemini["Gemini API (gemini-2.5-flash)"]

    subgraph PY["Python backend (standalone, not called by the UI)"]
        FastAPI["FastAPI app, port 8000"] --> Orch[WorkflowOrchestrator]
        Orch --> Agents["7 agents"]
        Agents --> Tools["Tools"]
        FastAPI --> ML["ML engine: forecast, anomaly, segmentation, profiling"]
        FastAPI --> Tasks["In-memory task registry"]
        Agents --> Store["In-memory vector store"]
    end

    Models[("SQLAlchemy models: defined, not connected to routes")] -.-> FastAPI
```

Components **not** present in the running system: PostgreSQL connection, Redis, Celery workers, a vector database, and a web-search provider. They appear in configuration and the Compose file only.

---

## 7. Technology Stack

### Used by the code

| Layer | Technology | Where |
|---|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Lucide React | `src/`, `vite.config.ts` |
| Full-stack server | Node.js, Express 4, `tsx`, `dotenv` | `server.ts` |
| LLM (optional) | Google Gemini via `@google/genai` (Express) and `google-genai` (Python provider) | `server.ts`, `app/ai/llm/` |
| Backend API | Python, FastAPI, Uvicorn, Pydantic v2, `pydantic-settings` | `app/main.py`, `app/config.py` |
| Database layer | SQLAlchemy 2.x (async engine and ORM models) | `app/database/` |
| Testing | Pytest, `pytest-asyncio`, `pytest-cov` | `tests/`, `pyproject.toml` |
| Type checking | TypeScript compiler (`tsc --noEmit`) | `npm run lint` |

### Declared but not used by the code

These appear in `requirements.txt`, `package.json`, `.env.example`, or Compose, but no source file imports or runs them yet:

- **Python:** Alembic, `asyncpg`/`psycopg2-binary` (only via the engine URL), Redis client, Celery, LangChain, LangGraph, ChromaDB, Qdrant client, `sentence-transformers`, pandas, NumPy, SciPy, scikit-learn, statsmodels, `python-jose`, `passlib`, `bcrypt`, `pypdf`, `python-docx`, `openpyxl`, `httpx` (outside tests).
- **JavaScript:** `motion`.
- **Infrastructure:** PostgreSQL 16 and Redis 7 containers in `docker-compose.yml`.

> The Python analytics are written in **pure Python (`math`)**, not NumPy, pandas, or scikit-learn. Also, `requirements.txt` omits `email-validator`, which `app/schemas/schemas.py` needs (see [Installation](#12-installation-and-running)).

---

## 8. Project Structure

```text
.
├── app/                         # Python backend (FastAPI)
│   ├── main.py                  # App entry: CORS, request-ID middleware, error handler, /health
│   ├── config.py                # Pydantic settings (env-driven)
│   ├── logging_config.py        # JSON structured logger
│   ├── api/v1/router.py         # /api/v1 routes (auth, workflows, research, datasets, analytics, forecast, tasks)
│   ├── agents/                  # BaseAgent, AgentState, and the 7 agents
│   ├── workflows/orchestrator.py# Sequential multi-agent orchestrator
│   ├── tools/tools.py           # Calculator, statistics, forecasting, RAG-search, research tools
│   ├── ml/analytics_engine.py   # DataProfiler, MLForecaster, CustomerSegmenter, AnomalyDetector
│   ├── rag/rag_pipeline.py      # Chunker + in-memory vector store (seeded with 2 sample docs)
│   ├── ai/llm/                  # LLM provider interface and Gemini provider/factory
│   ├── database/                # SQLAlchemy base, async session, and 14 ORM models
│   ├── schemas/schemas.py       # Pydantic request/response models and ApiResponse wrapper
│   ├── security/                # JWT helpers and RBAC roles/permissions
│   └── tasks/worker.py          # In-memory background task registry
├── src/                         # React frontend
│   ├── App.tsx, main.tsx        # App shell, tab navigation, embedded sample state
│   ├── pages/                   # 15 page components
│   ├── components/              # Sidebar, Navbar, StatCard, custom SVG Charts
│   └── types/index.ts           # Shared TypeScript types
├── server.ts                    # Express API + Vite dev middleware / static serving (used by the UI)
├── tests/unit/                  # test_agents.py, test_analytics.py
├── docs/                        # 20 design/guide documents (some ahead of the code)
├── docker-compose.yml           # postgres, redis, backend, worker, frontend services
├── requirements.txt             # Python dependencies
├── pyproject.toml               # Package metadata and pytest config
├── package.json, tsconfig.json, vite.config.ts, index.html
├── .env.example                 # Environment variable template
├── CHANGELOG.md, CONTRIBUTING.md, LICENSE
└── README.md
```

Not present in the repository: `Dockerfile`, `.github/workflows/`, Alembic configuration and migrations, a screenshots directory, and a `data/` directory.

---

## 9. Database Architecture

Fourteen SQLAlchemy models are defined in `app/database/models/models.py` (string UUID primary keys, `created_at` timestamps). **No API route uses them yet**, no tables are created anywhere in code, and **there is no migration system or seed data** (Alembic is a declared dependency only).

```mermaid
erDiagram
    ORGANIZATIONS ||--o{ USERS : has
    ORGANIZATIONS ||--o{ PROJECTS : owns
    USERS ||--o{ AUDIT_LOGS : generates
    PROJECTS ||--o{ DATASETS : contains
    PROJECTS ||--o{ DOCUMENTS : contains
    PROJECTS ||--o{ WORKFLOW_RUNS : runs
    DATASETS ||--o{ DATASET_COLUMNS : profiles
    DOCUMENTS ||--o{ DOCUMENT_CHUNKS : splits_into
    WORKFLOW_RUNS ||--o{ AGENT_RUNS : records
    CUSTOMERS ||--o{ TRANSACTIONS : places
    PRODUCTS ||--o{ TRANSACTIONS : sold_in
    BUSINESS_METRICS {
        datetime metric_date
    }
```

| Model | Purpose | Notable constraints |
|---|---|---|
| `Organization` | Tenant | `slug` unique |
| `User` | Account with a `Role` enum | `email` unique and indexed |
| `Project` | Groups datasets, documents, runs | FK to organization |
| `Dataset`, `DatasetColumn` | Dataset metadata and per-column profile | Columns cascade-delete with dataset |
| `Document`, `DocumentChunk` | Document metadata and text chunks (`vector_id` placeholder) | Chunks cascade-delete with document |
| `WorkflowRun`, `AgentRun` | Persisted workflow and per-agent logs | Agent runs cascade-delete with run |
| `Customer` | RFM fields and segment | `customer_code` unique |
| `Product` | SKU, category, price, cost, margin | `sku` unique |
| `Transaction` | Order line with revenue, cost, profit, region | `order_id` and `date` indexed |
| `BusinessMetric` | Daily/periodic rollup | `metric_date` indexed |
| `AuditLog` | Action, resource, IP, metadata | FK to user |

There is no soft deletion. `Customer`, `Product`, `Transaction`, and `BusinessMetric` are not scoped to an organization or project.

---

## 10. Authentication, Authorization and Security

### What exists

| Component | Status | Detail |
|---|---|---|
| Roles | ✅ defined | `Admin`, `Manager`, `Analyst`, `User` (`app/security/rbac.py`) |
| Permissions | ✅ defined | 15 permissions across datasets, documents, analytics/AI, reports, and admin. `has_permission(role, permission)` is available. |
| Permission enforcement | 🗺️ | Not applied to any route or tool. |
| Login / register endpoints | 🧪 | Return fixed mock responses. No credentials are checked or stored. |
| JWT helpers | ✅ / 🗺️ | HS256 token creation and verification written with the standard library (`app/security/jwt.py`), with expiry. **Not used by any route.** No refresh-token flow. |
| Password hashing | ⚠️ | A salted SHA-256 helper with a **static salt**. This is not suitable for production; use bcrypt or Argon2 (bcrypt is already in `requirements.txt` but unused). |
| UI role switching | 🧪 | The Admin page lets you *simulate* a role in the browser. It is not real access control. |
| Audit trail | 🧪 | The `AuditLog` model exists; the UI trail is sample content. |

### Other measures present

- CORS middleware (`CORS_ORIGINS`). The default list includes `"*"` together with `allow_credentials=True`, so **tighten it before any real deployment**.
- Per-request ID and `X-Process-Time-Ms` headers; a global exception handler that returns a generic message instead of internal details.
- Pydantic validation on request bodies (for example, a minimum password length of 8 on the register schema).
- `.gitignore` excludes `.env*` (except `.env.example`).
- `CalculatorTool` evaluates expressions with restricted globals. This is **not a hardened sandbox** and must not be exposed to untrusted input.

### Not implemented

Rate limiting (`RATE_LIMIT_PER_MINUTE` is an unused variable), file-type and file-size validation (`MAX_UPLOAD_SIZE_BYTES` is defined but unused; Express accepts JSON bodies up to 50 MB), authentication on any route, and Python code sandboxing.

> **Never commit secrets.** Keep API keys, JWT secrets, and database credentials in a local `.env` file (git-ignored) or a secrets manager. The placeholder secrets in `app/config.py` and `docker-compose.yml` are for local development only and must be replaced.

---

## 11. Environment Configuration

Copy the template and edit it (`.env` is git-ignored):

```bash
cp .env.example .env        # Windows (cmd): copy .env.example .env
```

Two runtimes read different variables.

### Express server and UI

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Enables live Gemini text for workflow summaries and research. The placeholder `MY_GEMINI_API_KEY` is treated as "not set". |
| `PORT` | Server port (default `3000`) |
| `NODE_ENV` | `production` serves the built `dist/` instead of the Vite dev middleware |

### Python backend (`app/config.py`)

| Variable | Default / example | Notes |
|---|---|---|
| `APP_ENV`, `DEBUG` | `development`, `false` | |
| `DATABASE_URL` | `postgresql+asyncpg://postgres:postgres@localhost:5432/nexus_bi` | The async engine needs the `+asyncpg` form. `.env.example` omits it, so add it if you set this variable. |
| `DATABASE_SYNC_URL` | `postgresql://...` | Defined, unused |
| `DB_POOL_SIZE`, `DB_MAX_OVERFLOW` | `10`, `20` | Used by the async engine |
| `REDIS_URL` | `redis://localhost:6379/0` | Defined, unused |
| `JWT_SECRET` | dev placeholder | **Override** in any non-local use |
| `JWT_ALGORITHM`, `JWT_EXPIRES_IN`, `REFRESH_TOKEN_EXPIRES_IN` | `HS256`, `86400`, `604800` | |
| `LLM_PROVIDER` | `gemini` | Any value falls back to the Gemini provider |
| `LLM_API_KEY` | none | **Python reads `LLM_API_KEY`, not `GEMINI_API_KEY`** (verified) |
| `LLM_MODEL`, `LLM_TEMPERATURE`, `EMBEDDING_MODEL` | `gemini-2.5-flash`, `0.2`, `text-embedding-004` | Embedding model is unused |
| `VECTOR_DB_PROVIDER`, `VECTOR_DB_URL`, `VECTOR_DB_COLLECTION` | `chromadb`, `http://localhost:8000`, `nexus_bi_knowledge` | Unused. Note the URL's port matches the FastAPI default. |
| `WEB_SEARCH_PROVIDER`, `WEB_SEARCH_API_KEY` | `tavily`, none | Unused |
| `STORAGE_PROVIDER`, `STORAGE_LOCAL_PATH`, `MAX_UPLOAD_SIZE_BYTES` | `local`, `./data/uploads`, 50 MB | Unused |
| `CORS_ORIGINS` | list | **Must be a JSON array** in `.env`, for example `["http://localhost:3000"]`. The comma-separated form shown in `.env.example` fails to parse (verified). |

Variables in `.env.example` that no code reads: `APP_URL`, `STORAGE_BUCKET`, `RATE_LIMIT_PER_MINUTE`.

---

## 12. Installation and Running

**Prerequisites:** Node.js 20+ and npm for the UI/Express server; Python 3.10+ for the FastAPI backend (`pyproject.toml` requires `>=3.10`).

### 12.1 Run the UI with the Express API (recommended)

```bash
git clone <repository-url>
cd <project-directory>

npm install --legacy-peer-deps
cp .env.example .env        # optional; set GEMINI_API_KEY to enable live Gemini text
npm run dev
```

Open **http://localhost:3000**.

> A plain `npm install` currently fails with an `ERESOLVE` peer-dependency conflict between `esbuild` and `vite`. `--legacy-peer-deps` resolves it. This was verified together with `npm run lint` and `npm run build`, both of which pass.

| Command | Purpose |
|---|---|
| `npm run dev` / `npm start` | Start Express with Vite middleware (`tsx server.ts`) |
| `npm run build` | Build the frontend into `dist/` |
| `NODE_ENV=production npm start` | Serve the built `dist/` from Express |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run preview` | Vite preview (static only; no API routes) |

### 12.2 Run the Python backend (standalone)

```bash
# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate

# Windows
python -m venv .venv
.venv\Scripts\activate
```

```bash
pip install -r requirements.txt
pip install email-validator          # required by app/schemas/schemas.py, missing from requirements.txt
uvicorn app.main:app --reload --port 8000
```

- API root: **http://localhost:8000/api/v1**, health: **http://localhost:8000/health**
- Swagger UI: **http://localhost:8000/docs**, ReDoc: **http://localhost:8000/redoc**
- If you set `CORS_ORIGINS` in `.env`, use JSON array syntax.

Verified: with the minimal package set (`fastapi`, `pydantic`, `pydantic-settings`, `email-validator`, `httpx`, `pytest`) the app imports and every route responds correctly through FastAPI's test client. A full install of every package in `requirements.txt` (which includes large ML libraries) was **not** run.

### 12.3 Database setup

No database is required to run either server. The PostgreSQL models are not connected to routes, there are no migrations, and there is no seed data. To experiment with the schema, create tables manually from the models (for example with `Base.metadata.create_all`) against a PostgreSQL instance using the `postgresql+asyncpg://` URL form.

---

## 13. Docker

`docker-compose.yml` defines five services:

| Service | Image / build | Port | Intended role |
|---|---|---|---|
| `postgres` | `postgres:16-alpine` (db `nexus_bi`) | 5432 | Database (not used by code yet) |
| `redis` | `redis:7-alpine` | 6379 | Cache/broker (not used by code yet) |
| `backend` | builds `./Dockerfile` | 8000 | FastAPI backend |
| `worker` | builds `./Dockerfile`, runs `celery -A app.tasks.worker worker` | n/a | Background worker |
| `frontend` | `node:20-alpine`, runs `npm install && npm run build && npm run preview` | 3000 | Static UI |

```bash
docker compose up --build
docker compose down
```

**Known issues (found by inspection; Docker itself was not run in the analysis environment):**

1. **There is no `Dockerfile` in the repository**, so `backend` and `worker` cannot build.
2. `app/tasks/worker.py` defines **no Celery application**, so the `worker` command would fail even with a Dockerfile.
3. The `frontend` service runs a plain `npm install` (which hits the peer-dependency conflict) and `vite preview`, which serves static files only and **does not run the Express API** that the UI calls.
4. The `backend` service passes a `postgresql://` URL while the app's engine expects `postgresql+asyncpg://`.
5. Compose contains placeholder credentials and a placeholder `JWT_SECRET` for local use only.

`docker compose up postgres redis` should start just the two infrastructure containers, but nothing in the code currently connects to them. For a working demo, use [12.1](#121-run-the-ui-with-the-express-api-recommended).

---

## 14. API Reference

All routes use the prefix `/api/v1` unless noted. **No route currently requires authentication**, and request validation is minimal on the Express server.

### 14.1 Express server (used by the UI, port 3000)

| Method | Endpoint | Purpose | Notes |
|---|---|---|---|
| POST | `/auth/login` | Mock login | Body `{ email }`. Returns a placeholder token and a fixed Admin user. |
| GET | `/auth/me` | Mock current user | Static response |
| POST | `/workflows/run` | Run the workflow | Body `{ prompt }`. Optional Gemini summary. Result is stored in an in-memory history. |
| POST | `/research/query` | Research | Body `{ topic, depth?, sources? }` |
| GET | `/datasets` | List sample datasets | |
| POST | `/datasets/upload` | Register a dataset record | Body `{ name, fileType, rows, columns }`. Metadata only; stores nothing durable. |
| GET | `/analytics/overview` | KPIs, ledger, products, categories, regions | Static sample data |
| POST | `/forecast/generate` | Forecast | Body `{ algorithm?, periodsAhead? }` |
| GET | `/anomalies` | Sample anomalies | |
| GET | `/customers/segments` | Sample RFM segments | |
| GET | `/documents` | Sample documents | |
| POST | `/documents/search` | Retrieval search | Body `{ query }`. Returns canned citations. |
| GET | `/agent-runs` | Workflow history for this process | Resets on restart |
| GET | `/health` (no prefix) | Health check | |

Responses use the shape `{ "success": true, "data": ..., "requestId": "req-..." }`. Data is held in memory and resets when the server restarts.

### 14.2 FastAPI backend (standalone, port 8000)

| Method | Endpoint | Purpose | Request body |
|---|---|---|---|
| POST | `/auth/login` | Mock login (fixed token) | `{ email, password }` |
| POST | `/auth/register` | Mock registration | `{ email, password (min 8), full_name, role? }` |
| POST | `/workflows/run` | Run the 7-agent orchestrator | `{ prompt }` (other fields in the schema are accepted but unused) |
| POST | `/research/query` | Simulated research | `{ topic, depth?, sources? }` |
| GET | `/datasets` | Sample dataset list | n/a |
| GET | `/analytics/overview` | Sample overview and revenue trend | n/a |
| POST | `/forecast/generate` | Linear-regression forecast over the 6-month series | `{ periods_ahead? }` (default 30) |
| GET | `/tasks/{task_id}` | Status of an in-memory task | n/a |
| GET | `/health` (no prefix) | Health check | n/a |

### 14.3 Response format (FastAPI)

Success:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "request_id": "req-20261004120000"
}
```

Unhandled errors return HTTP 500 from the global handler:

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred while processing the intelligence workflow."
  },
  "request_id": "req-<12 hex chars>"
}
```

Request-validation errors use FastAPI's default 422 format, not the wrapper. Both servers use a success wrapper, but with different key casing (`request_id` vs `requestId`) and, for data fields, snake_case vs camelCase.

---

## 15. Background Processing

`app/tasks/worker.py` provides `create_task(type, payload)` and `get_task_status(task_id)` backed by an **in-memory dictionary**. Status flips to `completed` after about one second, which is a simulation. No endpoint creates tasks (only `GET /tasks/{task_id}` exists), and **Celery and Redis are not used**. Document processing, embedding generation, model training, and report generation do not run as background jobs.

---

## 16. Machine Learning Pipeline

What exists, from `app/ml/analytics_engine.py`:

```text
Records / series
   ->  DataProfiler: rows, columns, nulls, uniques, numeric detection, duplicates, quality score
   ->  MLForecaster: OLS linear fit -> RMSE / MAE / MAPE -> 95% prediction interval
   ->  AnomalyDetector: z-score threshold -> severity (Medium / High / Critical)
   ->  CustomerSegmenter: rule-based RFM -> 6 segments + RFM score string
```

Quality score formula: `100 - 50 x (missing cells / total cells) - 50 x (duplicate rows / rows)`, floored at 0.

Not implemented: feature engineering, train/test splitting, hold-out evaluation (metrics are in-sample), model selection, a model registry, and monitoring. These routines use pure Python and are **not** built on scikit-learn, NumPy, or pandas.

---

## 17. AI Safety and Reliability

Principles the project is designed around, and where the code stands today:

| Principle | Status |
|---|---|
| **Calculations by code, not by the LLM** | Supported by the tools and ML functions, which are deterministic and unit-tested. In the current prototype, however, many agent outputs are pre-set values rather than the result of running those tools on real data. |
| **No fabricated sources** | The research and RAG citations in this repository are **static sample content with placeholder URLs**. Treat them as illustrative, not as real references. |
| **Verification** | The Fact Checker is a placeholder that returns a fixed list of "Verified" claims; it does not re-check numbers. |
| **Facts vs. predictions** | Forecast outputs carry intervals and error metrics, but the UI does not yet label statements by certainty level. |
| **No hidden chain-of-thought** | The step log exposes only agent name, status, tools, duration, tokens, and a short summary. Durations and token counts are illustrative. |
| **LLM use** | Gemini is used only to write narrative summary text, and its prompt includes the sample figures. Failures fall back to built-in text. |

Estimated cost fields (Express) are computed from the illustrative token counts and are not billing data.

---

## 18. Performance

There are no benchmarks. Techniques actually present: asynchronous FastAPI handlers and orchestrator, an async SQLAlchemy engine with a configurable connection pool (unused by routes), word-based chunking with overlap, and client-side filtering in the UI. Caching, pagination, batching, streaming, and background workers are not implemented.

---

## 19. Testing

Six unit tests, all passing:

| File | Covers |
|---|---|
| `tests/unit/test_agents.py` | Full orchestrator run: 7 steps recorded, plan, analysis results, anomalies, forecast, verification, and report keys |
| `tests/unit/test_analytics.py` | `CalculatorTool`, `PythonAnalysisTool`, `MLForecaster`, `DataProfiler`, `AnomalyDetector` |

```bash
pip install pytest pytest-asyncio pytest-cov pydantic pydantic-settings
pytest
```

`pyproject.toml` configures `testpaths = ["tests"]`, `asyncio_mode = "auto"`, and `--cov=app`, so `pytest-cov` is required. Frontend type-checking: `npm run lint`.

There are no API, integration, RAG, or end-to-end tests. Because the agents currently return largely fixed values, the workflow test confirms **pipeline structure** more than analytical correctness.

---

## 20. Continuous Integration

No CI is configured: there is no `.github/workflows` directory. `docs/CI_CD.md` describes a proposed GitHub Actions pipeline, but it is not in the repository. Local checks to run before a pull request: `pytest` and `npm run lint`. No deployment configuration exists.

---

## 21. Screenshots

No screenshots are included in the repository. To add them, create an `assets/` (or `docs/images/`) folder, commit the images, and reference them here, for example the Dashboard, Workflow Orchestrator, Forecast, and Anomalies pages.

---

## 22. Troubleshooting

| Problem | Cause and fix |
|---|---|
| `npm install` fails with `ERESOLVE` | Peer conflict between `esbuild` and `vite`. Use `npm install --legacy-peer-deps`. |
| `npm run lint` says it cannot find `vite/client` types | Dependencies are not installed. Run the install command above first. |
| Frontend loads but shows no live API data | You are on `vite preview` or a separate static host. Run `npm run dev` so Express serves `/api/v1`. |
| `ImportError: email-validator is not installed` | Run `pip install email-validator` (missing from `requirements.txt`). |
| `SettingsError` parsing `CORS_ORIGINS` | Use a JSON array: `CORS_ORIGINS=["http://localhost:3000"]`. |
| Python backend ignores `GEMINI_API_KEY` | It reads `LLM_API_KEY`. |
| Gemini text never appears | Express needs a real `GEMINI_API_KEY` (not the `MY_GEMINI_API_KEY` placeholder). Without it, built-in text is used by design. |
| Port 3000 or 8000 already in use | Set `PORT` for Express, or pass `--port` to Uvicorn. Note that `VECTOR_DB_URL` also defaults to port 8000. |
| `docker compose up --build` fails on `backend`/`worker` | No `Dockerfile` exists in the repository. See [Docker](#13-docker). |
| Database errors when you wire in PostgreSQL | Use the `postgresql+asyncpg://` URL form; the async engine rejects plain `postgresql://`. |
| Data resets after restart | Express and the Python task registry keep state in memory. |

---

## 23. Known Limitations

- Business data is **sample data** embedded in code; uploads are not parsed or persisted.
- Agent outputs, citations, anomalies, customer segments, and forecast display values are largely **static**.
- No live LLM-driven agent reasoning; Gemini only writes summary text on the Express server.
- RAG uses in-memory keyword matching with no embeddings or vector database.
- GraphRAG, K-Means, Holt-Winters, ARIMA, Prophet, and Ridge are not implemented.
- Authentication is mocked; RBAC is not enforced; password hashing uses a static salt; `CalculatorTool` is not a hardened sandbox; the default CORS list includes `*` with credentials.
- Two server runtimes overlap; the UI uses the Express one, and the FastAPI backend is not connected to it.
- Database models exist without migrations or route integration.
- Docker, Celery, and CI configurations are incomplete (see above).
- Test coverage is limited to six unit tests, and the forecast metrics are in-sample.

---

## 24. Roadmap

Everything below is **planned, not implemented**.

**Foundation**
- Choose one backend (FastAPI or Express) and connect the UI to it.
- Real authentication (hashed passwords, JWT with refresh tokens) and enforced RBAC.
- Alembic migrations, persistence for datasets, documents, runs, and audit logs.
- Add the missing `Dockerfile`, a real Celery app, and a working Compose setup.
- GitHub Actions: lint, type-check, tests, build.

**Data and AI**
- Real CSV/XLSX/JSON ingestion with validation and size limits; PDF/DOCX/TXT parsing.
- Embeddings and a vector database (ChromaDB or Qdrant) with metadata filtering and citations.
- Research, Document Intelligence, and Customer Segmentation agents; a real Supervisor planner with agent selection, parallel execution, retries, timeouts, and cancellation.
- Live LLM integration with structured outputs and tool calling; a Fact Checker that recomputes figures.
- Web-search integration for research with verifiable sources.
- GraphRAG entity extraction and hybrid retrieval.

**Analytics and reporting**
- Holt-Winters, ARIMA/Prophet, and tree-based forecasting with hold-out evaluation and model selection.
- K-Means or hierarchical customer clustering; IQR plus z-score anomaly detection driven from real data.
- XLSX/JSON/PDF report export; pagination in tables.
- Real-time alerts, model monitoring, additional LLM providers, and SSO.

---

## 25. Contributing

Contributions are welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

1. Fork and clone the repository.
2. Create a feature branch.
3. Keep modules separated (agents, tools, ML, API) and use type hints and Pydantic models.
4. Route calculations through code tools, not LLM output.
5. Add tests under `tests/` and run `pytest` and `npm run lint`.
6. Update this README and `docs/` if behavior changes, and keep status claims accurate.
7. Avoid breaking existing API contracts, and **never commit secrets**.

```bash
git checkout -b feature/my-new-feature
git add .
git commit -m "Add new feature"
git push origin feature/my-new-feature
```

Open a pull request with a clear description of what changed, how you tested it, and any API or schema impact.

---

## 26. Security Reporting

No security contact is configured in the repository yet. Maintainers should add one (a dedicated email address or GitHub's private vulnerability reporting) here before publishing. Until then, please **do not open public issues** containing vulnerabilities, and never post API keys, passwords, database credentials, JWT secrets, tokens, or `.env` files in public.

---

## 27. License

Released under the **MIT License**. See [`LICENSE`](LICENSE). Copyright (c) 2026 AgentBI Platform Contributors.

---

## 28. Project Vision

AgentBI explores how to move beyond traditional dashboards, basic analytics tools, and simple chatbots by combining:

```text
Multi-agent orchestration  +  Research  +  RAG  +  Business intelligence
+  Machine-learning forecasting  +  Anomaly detection  +  Customer analytics
+  Document intelligence  +  Automated reporting
```

into one platform where every analytical step is planned, computed by code, verified, and reported. The current repository is the architectural foundation and a working demonstration of that idea; the [Roadmap](#24-roadmap) lists what remains to make it real.

> **Turn data, documents, and research into actionable business intelligence with AI.**
