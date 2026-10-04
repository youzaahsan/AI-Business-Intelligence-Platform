"""
Unit tests for analytics and ML algorithms.
"""
from app.tools.tools import CalculatorTool, PythonAnalysisTool, ForecastingTool
from app.ml.analytics_engine import MLForecaster, DataProfiler, AnomalyDetector

def test_calculator_tool():
    res = CalculatorTool.execute("178000 / 195000 - 1")
    assert res.success is True
    assert round(res.data["result"], 3) == -0.087

def test_statistics_tool():
    numbers = [142000, 158000, 169000, 184000, 195000, 178000]
    res = PythonAnalysisTool.calculate_statistics(numbers)
    assert res.success is True
    assert res.data["count"] == 6
    assert res.data["mean"] == 171000.0

def test_forecaster():
    historical = [142000, 158000, 169000, 184000, 195000, 178000]
    fc = MLForecaster.forecast_sales(historical, periods_ahead=2)
    assert "forecast_periods" in fc
    assert len(fc["forecast_periods"]) == 2
    assert fc["mape"] < 10.0

def test_data_profiler():
    records = [
        {"id": 1, "product": "Widget A", "revenue": 100.0},
        {"id": 2, "product": "Widget B", "revenue": 150.0},
        {"id": 3, "product": None, "revenue": 200.0}
    ]
    profile = DataProfiler.profile_dataset(records)
    assert profile["row_count"] == 3
    assert profile["missing_cells"] == 1
    assert profile["quality_score"] > 80.0

def test_anomaly_detector():
    series = [
        {"date": "Day 1", "value": 100},
        {"date": "Day 2", "value": 102},
        {"date": "Day 3", "value": 98},
        {"date": "Day 4", "value": 250}, # anomaly
        {"date": "Day 5", "value": 101}
    ]
    anomalies = AnomalyDetector.detect_anomalies(series, value_key="value", threshold_z=1.5)
    assert len(anomalies) >= 1
    assert anomalies[0]["actual"] == 250
