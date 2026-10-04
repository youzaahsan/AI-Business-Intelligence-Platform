# Database Schema & Entity Design

AgentBI utilizes PostgreSQL 16 as its relational source of truth with UUID primary keys, foreign key constraints, composite indexes, and audit logs.

## Entity Relationship Overview

```text
organizations ──< users ──< audit_logs
      │
      └──< projects ──< datasets ──< dataset_columns
               │
               ├──< documents ──< document_chunks
               │
               └──< workflow_runs ──< agent_runs
```

## Core Tables

| Table | Purpose | Indexing |
|---|---|---|
| `users` | User accounts, hashed passwords, roles | Index on `email` |
| `projects` | Workspaces grouping datasets, documents, workflows | Index on `organization_id` |
| `datasets` | Metadata for uploaded CSV/XLSX/JSON files | Index on `project_id` |
| `dataset_columns` | Column profiles, types, nulls, numeric stats | Composite `(dataset_id, column_name)` |
| `documents` | Uploaded reference documents & vector index status | Index on `project_id` |
| `document_chunks` | Text fragments, embeddings vector ID | Index on `document_id` |
| `workflow_runs` | Execution state of user queries and plans | Index on `(project_id, created_at)` |
| `agent_runs` | Individual agent execution duration, tools, tokens | Index on `workflow_run_id` |
| `transactions` | E-commerce ledger records (orders, revenue, costs) | Index on `(order_id, date)` |
| `customers` | Customer profiles, RFM scores, segment assignments | Index on `customer_code` |
| `products` | Product catalog, SKUs, unit costs, target margins | Index on `sku` |
| `business_metrics` | Daily/monthly financial aggregations | Index on `metric_date` |
| `audit_logs` | Security and access audit trail | Index on `(user_id, created_at)` |
