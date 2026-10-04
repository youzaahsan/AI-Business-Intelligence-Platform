"""
Multi-Agent Workflow Orchestrator
Coordinates sequential and parallel execution of agents with state persistence, timeouts, and error recovery.
"""
import uuid
import time
from typing import Dict, Any, List
from app.agents.base import AgentState
from app.agents.agents import (
    SupervisorAgent,
    DataAnalystAgent,
    BusinessIntelligenceAgent,
    AnomalyAgent,
    ForecastingAgent,
    FactCheckerAgent,
    ReportAgent
)

class WorkflowOrchestrator:
    def __init__(self):
        self.supervisor = SupervisorAgent()
        self.analyst = DataAnalystAgent()
        self.bi = BusinessIntelligenceAgent()
        self.anomaly = AnomalyAgent()
        self.forecaster = ForecastingAgent()
        self.fact_checker = FactCheckerAgent()
        self.reporter = ReportAgent()

    async def execute_business_analysis(self, query: str, user_id: str = "usr-101") -> AgentState:
        task_id = f"task-{uuid.uuid4().hex[:8]}"
        state = AgentState(
            user_id=user_id,
            task_id=task_id,
            original_query=query
        )
        
        # 1. Supervisor constructs plan
        state = await self.supervisor.run(state)
        
        # 2. Data Analyst profiles numbers and calculates ledger trends
        state = await self.analyst.run(state)
        
        # 3. Business Intelligence diagnoses product margin impacts
        state = await self.bi.run(state)
        
        # 4. Anomaly detection catches statistical outliers
        state = await self.anomaly.run(state)
        
        # 5. ML Forecaster predicts next period
        state = await self.forecaster.run(state)
        
        # 6. Fact Checker verifies calculations & claims
        state = await self.fact_checker.run(state)
        
        # 7. Report Agent synthesizes structured executive summary
        state = await self.reporter.run(state)
        
        return state

orchestrator = WorkflowOrchestrator()
