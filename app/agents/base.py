"""
Base Agent and Typed Workflow State
Strictly typed workflow state as specified in Section 7.
"""
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
try:
    from pydantic import BaseModel, Field
except ImportError:
    class BaseModel:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)
    def Field(default=None, **kwargs):
        return default

class AgentState(BaseModel):
    user_id: Optional[str] = "user_default"
    task_id: str
    original_query: str
    plan: List[str] = []
    documents: List[Dict[str, Any]] = []
    datasets: List[Dict[str, Any]] = []
    research_results: List[Dict[str, Any]] = []
    analysis_results: Dict[str, Any] = {}
    forecasts: Dict[str, Any] = {}
    anomalies: List[Dict[str, Any]] = []
    insights: List[str] = []
    verification_results: List[Dict[str, Any]] = []
    final_report: Dict[str, Any] = {}
    errors: List[str] = []
    step_history: List[Dict[str, Any]] = []
    total_tokens: int = 0
    total_duration_ms: int = 0

class BaseAgent(ABC):
    def __init__(self, name: str, role_description: str):
        self.name = name
        self.role_description = role_description

    @abstractmethod
    async def run(self, state: AgentState) -> AgentState:
        pass
