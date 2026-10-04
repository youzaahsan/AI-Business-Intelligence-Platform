# System Architecture

The AgentBI platform is built upon a layered micro-modular architecture designed for enterprise scalability, verifiable mathematical integrity, and autonomous multi-agent execution.

## Architectural Layers

```mermaid
flowchart TD
    subgraph ClientLayer [Client & Presentation Layer]
        SPA[React 19 SPA + Tailwind CSS]
        Charts[Interactive Visualization Engine]
        Exports[PDF & Spreadsheet Export Engine]
    end

    subgraph GatewayLayer [API & Ingress Gateway]
        Express[Express Full-Stack Bridge / port 3000]
        FastAPI[FastAPI Backend / port 8000]
        JWT[JWT & RBAC Middleware]
        RateLimiter[Rate Limiter & Audit Logger]
    end

    subgraph AgentOrchestration [Multi-Agent Orchestration Layer]
        Supervisor[Supervisor Agent]
        Plan[Execution Graph Planner]
        Workers[Specialized Worker Agents]
        FactCheck[Fact Checker & Verifier]
        Report[Executive Report Agent]
    end

    subgraph AnalyticalEngine [Data & ML Compute Layer]
        PandasEngine[Pandas & NumPy Computation Core]
        MLModels[Forecasting & Anomaly Models]
        RAGRetriever[Vector Retriever & Reranker]
    end

    subgraph StorageLayer [Persistence & Cache Layer]
        Postgres[(PostgreSQL 16 Database)]
        Redis[(Redis Cache & Task Broker)]
        VectorDB[(ChromaDB / Qdrant Vector Store)]
        BlobStorage[(Local / S3 Storage)]
    end

    SPA --> Express
    Express --> FastAPI
    FastAPI --> JWT
    JWT --> RateLimiter
    RateLimiter --> Supervisor
    Supervisor --> Plan
    Plan --> Workers
    Workers --> AnalyticalEngine
    AnalyticalEngine --> StorageLayer
    Workers --> FactCheck
    FactCheck --> Report
    Report --> SPA
```

## Core Architectural Principles

1. **Deterministic Calculation Isolation**: Large Language Models never compute arithmetic or financial sums directly. All calculations are executed by verified Python tool modules (`CalculatorTool`, `PythonAnalysisTool`, `MLForecaster`).
2. **Strict Agent State Encapsulation**: Agents mutate an immutable `AgentState` object passing inputs, outputs, duration timestamps, and token counts.
3. **Pluggable AI & Vector Providers**: Unified provider abstractions decouple the system from proprietary LLM vendors. Switching between Gemini, OpenAI, or self-hosted models requires zero codebase rewrites.
4. **Auditability & Zero Fabricated Facts**: Every metric presented in executive reports links back to a ledger transaction, calculation hash, or document vector citation.
