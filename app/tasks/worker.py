"""
Background Task Worker
Celery worker configuration for asynchronous long-running tasks.
"""
from typing import Dict, Any
import time

class CeleryMockTask:
    def __init__(self, task_id: str, name: str):
        self.task_id = task_id
        self.name = name
        self.status = "queued"
        self.progress = 0
        self.result = None

# In-memory background task registry
task_registry: Dict[str, Dict[str, Any]] = {}

def create_task(task_type: str, payload: Dict[str, Any]) -> str:
    import uuid
    task_id = f"task-{uuid.uuid4().hex[:12]}"
    task_registry[task_id] = {
        "task_id": task_id,
        "type": task_type,
        "status": "processing",
        "created_at": time.time(),
        "payload": payload,
        "result": None
    }
    return task_id

def get_task_status(task_id: str) -> Dict[str, Any]:
    task = task_registry.get(task_id)
    if not task:
        return {"status": "not_found", "task_id": task_id}
    # Simulate completion if > 1s
    if time.time() - task["created_at"] > 1.0:
        task["status"] = "completed"
        task["result"] = {"status": "success", "message": "Completed processing background task"}
    return task
