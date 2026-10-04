# GraphRAG Architecture & Knowledge Graph Readiness

GraphRAG combines vector similarity search with structured knowledge graphs to resolve multi-hop queries, such as:
*"Which suppliers impacted products that were purchased by at-risk enterprise customers in Q3?"*

## Graph Schema & Ontological Entities

```text
(Customer)-[:PURCHASED]->(Product)
(Product)-[:BELONGS_TO]->(Category)
(Supplier)-[:SUPPLIES]->(Product)
(Transaction)-[:CONTAINS]->(Product)
(Document)-[:MENTIONS]->(Company)
(Document)-[:MENTIONS]->(Product)
(Anomaly)-[:ASSOCIATED_WITH]->(Product)
```

## Graph Query Resolution

1. **Entity Extraction**: Named Entity Recognition (NER) identifies products (`SKU-PRO-X1`), suppliers, and customer entities.
2. **Graph Traversal**: Subgraph traversal pinpoints interconnected nodes across transaction records and supplier invoices.
3. **Hybrid Retrieval**: Vector semantic search retrieves narrative memos while the Knowledge Graph traverses direct causal links between component suppliers and finished product margin drops.
