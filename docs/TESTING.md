# Quality Assurance & Testing Suite

AgentBI maintains comprehensive test coverage across unit algorithms, multi-agent workflows, and REST API layers.

## Test Directory Layout

```text
tests/
├── unit/
│   ├── test_analytics.py     # Math tools, profiler, forecaster, anomaly detector
│   └── test_agents.py        # Agent orchestration, state mutability, fact checking
├── integration/
│   ├── test_rag.py           # Document chunking & vector search
│   └── test_database.py      # SQLAlchemy sessions & migrations
└── api/
    └── test_endpoints.py     # Auth, datasets, workflows, reports endpoints
```

## Running Tests

Execute full test suite with coverage report:

```bash
pytest --cov=app tests/
```

Execute only agent orchestration unit tests:

```bash
pytest tests/unit/test_agents.py -v
```

Execute TypeScript frontend verification:

```bash
npm run lint
```
