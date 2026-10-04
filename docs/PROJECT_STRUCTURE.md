# Project Directory Structure

```text
multi-agent-bi/
├── app/                        # Python Backend Application Core
│   ├── main.py                 # FastAPI Application Initialization & Middleware
│   ├── config.py               # Pydantic Settings & Environment Parsing
│   ├── logging_config.py       # Structured JSON Logging & Request Tracing
│   │
│   ├── api/                    # API Route Definitions
│   │   ├── dependencies.py     # Auth & Database Dependency Injection
│   │   └── v1/
│   │       ├── router.py       # V1 Central API Router
│   │       └── routes/         # Modular endpoint handlers
│   │
│   ├── agents/                 # Multi-Agent Implementations
│   │   ├── base.py             # BaseAgent & AgentState Typed Definitions
│   │   ├── supervisor.py       # Supervisor Orchestration Agent
│   │   ├── research.py         # Grounded Web & Document Research Agent
│   │   ├── document.py         # Document Parsing & Table Extractor
│   │   ├── analyst.py          # Data Profiling & Statistical Analyst
│   │   ├── business_intelligence.py # Financial KPI & Margin Diagnostics
│   │   ├── forecasting.py      # ML Sales & Demand Projection
│   │   ├── segmentation.py     # Customer RFM & K-Means Clusters
│   │   ├── anomaly.py          # Statistical Outlier & Z-Score Detection
│   │   ├── fact_checker.py     # Calculation & Citation Verification
│   │   └── report.py           # Executive Summary & Markdown Synthesizer
│   │
│   ├── workflows/              # LangGraph Workflow Orchestration Graphs
│   ├── ai/                     # LLM Provider Abstraction & Prompts
│   ├── rag/                    # Document Chunking, Embeddings & Vector Search
│   ├── ml/                     # ML Algorithms, Profilers & Model Registry
│   ├── tools/                  # Deterministic Agent Execution Tools
│   ├── database/               # SQLAlchemy 2.0 ORM Models & Migrations
│   ├── schemas/                # Pydantic V2 Request & Response Schemas
│   ├── security/               # JWT Token Validation & RBAC Engine
│   └── tasks/                  # Celery Background Task Workers
│
├── src/                        # React 19 Frontend Client
│   ├── components/             # Reusable UI & Chart Components
│   ├── pages/                  # SaaS Application Pages
│   ├── App.tsx                 # Main Application Layout & Router
│   └── main.tsx                # Client Entry Point
│
├── tests/                      # Automated Test Suites
├── docs/                       # Complete Architecture & Operation Docs
├── Dockerfile                  # Production Multi-Stage Containerfile
├── docker-compose.yml          # Postgres, Redis, Worker, Backend, Frontend
├── requirements.txt            # Python Dependencies
├── pyproject.toml              # Build & Packaging Metadata
└── server.ts                   # Full-Stack Express Server & Vite Middleware
```
