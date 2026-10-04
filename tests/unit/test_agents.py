"""
Unit tests for multi-agent workflow orchestrator.
"""
try:
    import pytest
except ImportError:
    class MockPytest:
        class mark:
            @staticmethod
            def asyncio(fn):
                return fn
    pytest = MockPytest()
import asyncio
from app.workflows.orchestrator import orchestrator

@pytest.mark.asyncio
async def test_multi_agent_workflow():
    query = "Analyze my last 6 months of sales, explain why profit decreased in September, identify the products causing the problem, forecast October sales, and give me recommendations."
    state = await orchestrator.execute_business_analysis(query)
    
    assert state.task_id is not None
    assert len(state.plan) > 0
    assert len(state.step_history) == 7
    assert "monthly_sales" in state.analysis_results
    assert len(state.anomalies) > 0
    assert "october_sales" in state.forecasts
    assert len(state.verification_results) > 0
    assert "strategic_recommendations" in state.final_report
    assert state.final_report["confidence_score"] >= 0.95
