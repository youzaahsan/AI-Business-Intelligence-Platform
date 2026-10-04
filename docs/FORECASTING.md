# Predictive Sales & Demand Forecasting

The Forecasting Agent implements statistical and machine-learning time series modeling to project future sales volumes, revenues, and inventory requirements.

## Mathematical Formulation

Linear trend forecasting computes:

$$
\hat{y}_{t+h} = \hat{\beta}_0 + \hat{\beta}_1 (t+h)
$$

with parameters estimated via Ordinary Least Squares (OLS):

$$
\hat{\beta}_1 = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^n (x_i - \bar{x})^2}, \quad \hat{\beta}_0 = \bar{y} - \hat{\beta}_1 \bar{x}
$$

### Prediction Intervals (95% Confidence)

$$
\hat{y}_{t+h} \pm t_{n-2, 0.975} \cdot s_e \sqrt{1 + \frac{1}{n} + \frac{(x_{new} - \bar{x})^2}{\sum (x_i - \bar{x})^2}}
$$

where $s_e$ is the standard error of regression residuals.

## Forecast Output Schema

```json
{
  "metric": "sales_revenue",
  "horizon_periods": 3,
  "model_type": "Linear Trend Regression with 95% CI",
  "points": [
    {"period": "Period +1", "predicted": 192500, "lower_bound": 181000, "upper_bound": 204000}
  ],
  "metrics": {
    "rmse": 4820.5,
    "mae": 3910.0,
    "mape": 2.4
  }
}
```
