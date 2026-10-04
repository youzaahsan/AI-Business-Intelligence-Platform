# Enterprise Security & RBAC Specification

AgentBI adheres to enterprise security standards, safeguarding datasets, customer records, and AI tool operations.

## Authentication & Tokens

- **JWT Tokens**: Signed using HMAC-SHA256 (`HS256`) with configurable expiration (default 24h) and secure refresh tokens.
- **Passwords**: Salted hashing prevents rainbow-table lookups.
- **Header Format**: `Authorization: Bearer <token>`

## Role-Based Access Control (RBAC) Matrix

| Permission | Admin | Manager | Analyst | User |
|---|:---:|:---:|:---:|:---:|
| `dataset:read` | ✅ | ✅ | ✅ | ✅ |
| `dataset:upload` | ✅ | ✅ | ✅ | ❌ |
| `dataset:delete` | ✅ | ✅ | ❌ | ❌ |
| `document:read` | ✅ | ✅ | ✅ | ✅ |
| `document:upload` | ✅ | ✅ | ✅ | ❌ |
| `analytics:view` | ✅ | ✅ | ✅ | ✅ |
| `ai:use` | ✅ | ✅ | ✅ | ✅ |
| `research:execute` | ✅ | ✅ | ✅ | ❌ |
| `workflow:trigger` | ✅ | ✅ | ✅ | ❌ |
| `report:generate` | ✅ | ✅ | ✅ | ❌ |
| `report:export` | ✅ | ✅ | ✅ | ✅ |
| `user:manage` | ✅ | ❌ | ❌ | ❌ |
| `audit:view` | ✅ | ✅ | ❌ | ❌ |

## Sandboxing & Code Execution

- Python code execution tools run in isolated restricted namespaces with explicit built-in restrictions.
- Filesystem access is strictly restricted to designated upload buckets (`./data/uploads`). Original filenames are sanitized to prevent directory traversal attacks (`../`).
