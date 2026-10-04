# System Monitoring & Audit Telemetry

AgentBI implements structured JSON observability to monitor multi-agent execution, model latency, token consumption, and financial query integrity.

## Monitored Metrics

1. **Agent Latency**: Duration per agent step in milliseconds.
2. **Token Consumption & Cost**: Input/output tokens tracked per workflow run and aggregate tenant costs.
3. **Model Accuracy & Drift**: RMSE/MAE/MAPE tracking across sequential forecasting cycles.
4. **Audit Trail**: Every file upload, workflow execution, report export, and permission modification is recorded in `audit_logs`.

## Structured Log Format

```json
{
  "timestamp": "2026-10-04T12:00:00.123Z",
  "level": "INFO",
  "message": "Completed multi-agent workflow run task-98a4f1",
  "request_id": "req-20261004120000",
  "agent_id": "Supervisor Agent",
  "duration_ms": 1980,
  "tokens_consumed": 2180,
  "estimated_cost_usd": 0.0032
}
```
