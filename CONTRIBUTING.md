# Contributing to AgentBI

We welcome contributions to the Multi-Agent AI Research & Business Intelligence Platform!

## Development Guidelines

1. **Clean Architecture**: Maintain modular isolation between agents, tools, ML engines, and API endpoints.
2. **Type Safety**: Use Python type hints and Pydantic models for all data structures.
3. **No Hallucinated Calculations**: Deterministic statistics, financial metrics, and forecasting must run through Python tools.
4. **Testing**: Write unit tests in `tests/` before submitting Pull Requests.
5. **Code Style**: Follow PEP8 conventions for Python and ESLint/Prettier for React/TypeScript.

## Pull Request Process

1. Fork the repo and create your branch from `main`: `git checkout -b feature/my-feature`.
2. Run test suite: `pytest tests/`.
3. Verify type-checks: `npm run lint`.
4. Submit PR with detailed description of agent or ML modifications.
