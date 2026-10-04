# Business Intelligence & Financial Analytics

The Business Intelligence Agent computes core financial health metrics directly from transaction logs.

## Standard Formulations

$$
\text{Gross Profit} = \text{Revenue} - \text{Cost of Goods Sold (COGS)}
$$

$$
\text{Gross Margin \%} = \left(\frac{\text{Gross Profit}}{\text{Revenue}}\right) \times 100
$$

$$
\text{Net Profit} = \text{Gross Profit} - \text{Operating Expenses (OPEX)}
$$

$$
\text{Average Order Value (AOV)} = \frac{\text{Total Revenue}}{\text{Total Completed Orders}}
$$

$$
\text{Growth Rate MoM \%} = \left(\frac{\text{Revenue}_t - \text{Revenue}_{t-1}}{\text{Revenue}_{t-1}}\right) \times 100
$$

## Root Cause Decomposition

When overall profit margin drops while sales volume remains elevated, the BI Agent executes automated multidimensional decomposition:
1. **Product Contribution**: Isolates individual SKU margin shifts $(\Delta \text{Margin}_i \times \text{Volume}_i)$.
2. **Category Performance**: Evaluates mix shifts (e.g. higher-volume lower-margin accessory lines vs high-margin enterprise software).
3. **Regional Freight & Logistics**: Flags unexpected regional fulfillment cost spikes.
