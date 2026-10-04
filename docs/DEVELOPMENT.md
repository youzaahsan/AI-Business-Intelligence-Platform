# Developer Guide & Agent Authoring

This guide outlines standards and best practices for extending AgentBI with new agents, tools, and ML models.

## Adding a New Agent

1. Inherit from `BaseAgent` in `app/agents/base.py`:
```python
from app.agents.base import BaseAgent, AgentState

class InventoryOptimizationAgent(BaseAgent):
    def __init__(self):
        super().__init__("Inventory Agent", "Calculates optimal safety stock and reorder points.")

    async def run(self, state: AgentState) -> AgentState:
        # Perform deterministic computations via tools
        # Append step to state.step_history
        return state
```

2. Register the agent in `app/workflows/orchestrator.py`.
3. Add corresponding permission check in `app/security/rbac.py`.
4. Ensure all calculations call `CalculatorTool` or `PythonAnalysisTool`.

## Code Quality Standards

- **Python**: Run `pytest tests/` and verify all tests pass.
- **Frontend**: Run `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors.
- **Logging**: Never use `print()`. Use `logger.info()` with structured context dictionaries.
- **Secrets**: Never hardcode credentials or API keys.
