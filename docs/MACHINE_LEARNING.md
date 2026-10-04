# Machine Learning Engine & Model Registry

AgentBI features deterministic ML pipelines running scikit-learn, SciPy, and NumPy.

## ML Modules

### 1. Time-Series Forecasting
- **Linear & Polynomial Trend Regression**: Base trend line with parametric prediction bounds.
- **Holt-Winters Exponential Smoothing**: Accounts for additive/multiplicative seasonality and baseline trend.
- **Model Evaluation**: Automatically computes:
  - **RMSE** (Root Mean Squared Error): Penalizes larger forecasting errors.
  - **MAE** (Mean Absolute Error): Measures absolute magnitude of error.
  - **MAPE** (Mean Absolute Percentage Error): Expresses accuracy as an intuitive percentage.

### 2. Customer Segmentation (RFM + K-Means)
- Features:
  - $R$ (Recency): Days elapsed since last order.
  - $F$ (Frequency): Total lifetime order volume.
  - $M$ (Monetary): Total lifetime customer gross spend.
- Segments:
  - **High Value**: Top monetary spenders with frequent recent transactions.
  - **Regular**: Consistent repeat purchasers with standard order size.
  - **New**: Accounts onboarded within the last 30 days.
  - **Low Value**: Infrequent small-ticket purchasers.
  - **At Risk**: High historical monetary spenders who have not transacted in >90 days.
  - **Inactive**: Dormant accounts (>120 days since transaction).

### 3. Anomaly Detection
- **Z-Score Detection**: Identifies metrics deviating $>2\sigma$ from rolling window means.
- **Interquartile Range (IQR)**: Robust to extreme skewness; flags data outside $[Q_1 - 1.5\text{IQR}, Q_3 + 1.5\text{IQR}]$.
- **Severity Tagging**: Categorizes outliers into Low, Medium, High, and Critical.
