# Production Deployment Guide

Deploying AgentBI in enterprise cloud environments (AWS, GCP, Azure, or Kubernetes).

## Deployment Topology

```text
               Internet
                  │
                  ▼ [443 HTTPS]
           Cloud Load Balancer
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
  Frontend (Vite/Node)   Backend (FastAPI)
  Port 3000              Port 8000
        │                   │
        └─────────┬─────────┘
                  ▼
          Private Subnet
      ┌───────────┼───────────┐
      ▼           ▼           ▼
 PostgreSQL     Redis      Celery Worker
 Port 5432    Port 6379    Concurrency=4
```

## Checklist Before Production Go-Live

1. **Secrets**: Set strong random strings for `JWT_SECRET` and secure database passwords.
2. **CORS**: Restrict `CORS_ORIGINS` to verified production domain names.
3. **Database Migrations**: Apply all Alembic revisions before starting backend containers:
   ```bash
   alembic upgrade head
   ```
4. **SSL/TLS**: Ensure reverse proxy terminates TLS 1.3 with automated certificate renewal (Let's Encrypt / Cloudflare).
5. **Backups**: Schedule automated daily pg_dump snapshots to encrypted S3/GCS buckets.
