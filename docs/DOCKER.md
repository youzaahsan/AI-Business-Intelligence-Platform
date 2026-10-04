# Docker & Containerization Reference

AgentBI provides production-optimized container definitions supporting multi-stage caching and rootless security standards.

## Docker Compose Services

```bash
docker-compose up -d
```

| Service | Image | Internal Port | Description |
|---|---|---|---|
| `postgres` | `postgres:16-alpine` | `5432` | Relational operational data store |
| `redis` | `redis:7-alpine` | `6379` | Distributed cache & task queue broker |
| `backend` | `Dockerfile` (Python 3.11) | `8000` | FastAPI Multi-Agent Engine |
| `worker` | `Dockerfile` (Celery) | N/A | Background task processing worker |
| `frontend` | `node:20-alpine` | `3000` | React 19 UI & Full-stack Express bridge |

## Health Checks

All critical services expose standard health check probes:
- **Postgres**: `pg_isready -U postgres -d nexus_bi`
- **Redis**: `redis-cli ping`
- **Backend**: `GET http://localhost:8000/health`
