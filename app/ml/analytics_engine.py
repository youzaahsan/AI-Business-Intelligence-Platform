"""
Machine Learning & Advanced Analytics Engine
Forecasting, Customer Segmentation (RFM + K-Means), Anomaly Detection, and Dataset Profiling.
"""
from typing import List, Dict, Any, Tuple
import math

class DataProfiler:
    @staticmethod
    def profile_dataset(records: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not records:
            return {"row_count": 0, "col_count": 0, "quality_score": 0.0, "columns": []}
            
        row_count = len(records)
        columns = list(records[0].keys())
        col_count = len(columns)
        
        missing_count = 0
        duplicate_count = 0
        seen_rows = set()
        
        col_profiles = []
        for col in columns:
            vals = [r.get(col) for r in records]
            nulls = sum(1 for v in vals if v is None or v == "")
            missing_count += nulls
            uniques = len(set(str(v) for v in vals))
            
            # Numeric detection
            numeric_vals = []
            for v in vals:
                try:
                    if v is not None and v != "":
                        numeric_vals.append(float(v))
                except (ValueError, TypeError):
                    pass
            is_numeric = len(numeric_vals) > len(vals) * 0.8
            
            mean_v = round(sum(numeric_vals) / len(numeric_vals), 2) if numeric_vals else None
            col_profiles.append({
                "column_name": col,
                "data_type": "float/int" if is_numeric else "string",
                "null_count": nulls,
                "unique_count": uniques,
                "is_numeric": is_numeric,
                "mean": mean_v
            })
            
        for r in records:
            r_str = str(sorted(r.items()))
            if r_str in seen_rows:
                duplicate_count += 1
            else:
                seen_rows.add(r_str)
                
        total_cells = row_count * col_count
        quality_score = max(0.0, round(100.0 - (missing_count / max(total_cells, 1) * 50) - (duplicate_count / max(row_count, 1) * 50), 1))
        
        return {
            "row_count": row_count,
            "col_count": col_count,
            "quality_score": quality_score,
            "missing_cells": missing_count,
            "duplicate_rows": duplicate_count,
            "columns": col_profiles
        }

class MLForecaster:
    @staticmethod
    def forecast_sales(historical: List[float], periods_ahead: int = 3) -> Dict[str, Any]:
        n = len(historical)
        if n < 3:
            return {"error": "Need at least 3 historical points"}
            
        x = list(range(n))
        x_mean = sum(x) / n
        y_mean = sum(historical) / n
        
        cov = sum((x[i] - x_mean) * (historical[i] - y_mean) for i in range(n))
        var_x = sum((x[i] - x_mean) ** 2 for i in range(n)) or 1
        slope = cov / var_x
        intercept = y_mean - slope * x_mean
        
        # Fit evaluation
        fitted = [intercept + slope * i for i in x]
        residuals = [historical[i] - fitted[i] for i in range(n)]
        mse = sum(r ** 2 for r in residuals) / n
        rmse = round(math.sqrt(mse), 2)
        mae = round(sum(abs(r) for r in residuals) / n, 2)
        mape = round(sum(abs(residuals[i] / max(historical[i], 1)) for i in range(n)) / n * 100, 2)
        
        future_points = []
        for p in range(1, periods_ahead + 1):
            pred_idx = n - 1 + p
            pred_val = round(intercept + slope * pred_idx, 2)
            margin = rmse * 1.96 * math.sqrt(1 + 1/n + (pred_idx - x_mean)**2 / var_x)
            future_points.append({
                "period": f"Period +{p}",
                "predicted": pred_val,
                "lower_bound": round(pred_val - margin, 2),
                "upper_bound": round(pred_val + margin, 2)
            })
            
        return {
            "model_name": "Linear Regression with 95% Confidence Interval",
            "rmse": rmse,
            "mae": mae,
            "mape": mape,
            "forecast_periods": future_points
        }

class CustomerSegmenter:
    @staticmethod
    def segment_customers(customers_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """RFM-based Segmentation assigning customers into High Value, Regular, New, Low Value, At Risk, Inactive."""
        results = []
        for c in customers_data:
            recency = c.get("recency_days", 30)
            frequency = c.get("frequency_orders", 3)
            monetary = c.get("monetary_total", 500)
            
            # RFM Scoring heuristic
            if monetary >= 5000 and frequency >= 8:
                segment = "High Value"
            elif recency > 90 and monetary >= 2000:
                segment = "At Risk"
            elif recency > 120:
                segment = "Inactive"
            elif frequency <= 2 and recency <= 30:
                segment = "New"
            elif monetary < 500:
                segment = "Low Value"
            else:
                segment = "Regular"
                
            results.append({
                **c,
                "segment": segment,
                "rfm_score": f"{min(5, max(1, 6 - recency // 30))}{min(5, max(1, frequency // 2))}{min(5, max(1, int(monetary // 1000) + 1))}"
            })
        return results

class AnomalyDetector:
    @staticmethod
    def detect_anomalies(series: List[Dict[str, Any]], value_key: str = "value", threshold_z: float = 1.8) -> List[Dict[str, Any]]:
        values = [s.get(value_key, 0) for s in series]
        if len(values) < 4:
            return []
            
        mean_v = sum(values) / len(values)
        std_v = math.sqrt(sum((v - mean_v) ** 2 for v in values) / max(len(values) - 1, 1)) or 1
        
        anomalies = []
        for idx, item in enumerate(series):
            val = item.get(value_key, 0)
            z_score = abs(val - mean_v) / std_v
            if z_score >= threshold_z:
                diff = val - mean_v
                severity = "Critical" if z_score >= 2.5 else ("High" if z_score >= 2.0 else "Medium")
                anomalies.append({
                    "index": idx,
                    "date": item.get("date", f"Index {idx}"),
                    "metric": value_key,
                    "expected": round(mean_v, 2),
                    "actual": val,
                    "z_score": round(z_score, 2),
                    "severity": severity,
                    "reason": f"Value deviated by {round((diff / mean_v) * 100, 1)}% from expected average ({round(mean_v, 1)})."
                })
        return anomalies
