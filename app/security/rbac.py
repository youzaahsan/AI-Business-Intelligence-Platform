"""
Role-Based Access Control (RBAC) System
Defines User Roles and fine-grained Permission mappings.
"""
from enum import Enum
from typing import List, Set

class Role(str, Enum):
    ADMIN = "Admin"
    MANAGER = "Manager"
    ANALYST = "Analyst"
    USER = "User"

class Permission(str, Enum):
    # Datasets
    DATASET_READ = "dataset:read"
    DATASET_UPLOAD = "dataset:upload"
    DATASET_DELETE = "dataset:delete"
    
    # Documents
    DOCUMENT_READ = "document:read"
    DOCUMENT_UPLOAD = "document:upload"
    DOCUMENT_DELETE = "document:delete"
    
    # Analytics & AI
    ANALYTICS_VIEW = "analytics:view"
    AI_ASSISTANT_USE = "ai:use"
    RESEARCH_EXECUTE = "research:execute"
    WORKFLOW_TRIGGER = "workflow:trigger"
    REPORT_GENERATE = "report:generate"
    REPORT_EXPORT = "report:export"
    
    # Admin
    USER_MANAGE = "user:manage"
    SYSTEM_CONFIG = "system:config"
    AUDIT_LOGS_VIEW = "audit:view"

ROLE_PERMISSIONS: dict[Role, Set[Permission]] = {
    Role.ADMIN: set(Permission),
    Role.MANAGER: {
        Permission.DATASET_READ, Permission.DATASET_UPLOAD, Permission.DATASET_DELETE,
        Permission.DOCUMENT_READ, Permission.DOCUMENT_UPLOAD, Permission.DOCUMENT_DELETE,
        Permission.ANALYTICS_VIEW, Permission.AI_ASSISTANT_USE, Permission.RESEARCH_EXECUTE,
        Permission.WORKFLOW_TRIGGER, Permission.REPORT_GENERATE, Permission.REPORT_EXPORT,
        Permission.AUDIT_LOGS_VIEW
    },
    Role.ANALYST: {
        Permission.DATASET_READ, Permission.DATASET_UPLOAD,
        Permission.DOCUMENT_READ, Permission.DOCUMENT_UPLOAD,
        Permission.ANALYTICS_VIEW, Permission.AI_ASSISTANT_USE, Permission.RESEARCH_EXECUTE,
        Permission.WORKFLOW_TRIGGER, Permission.REPORT_GENERATE, Permission.REPORT_EXPORT
    },
    Role.USER: {
        Permission.DATASET_READ,
        Permission.DOCUMENT_READ,
        Permission.ANALYTICS_VIEW,
        Permission.AI_ASSISTANT_USE,
        Permission.REPORT_EXPORT
    }
}

def has_permission(user_role: Role, required_permission: Permission) -> bool:
    perms = ROLE_PERMISSIONS.get(user_role, set())
    return required_permission in perms
