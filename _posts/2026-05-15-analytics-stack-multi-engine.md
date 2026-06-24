---
title: "Multi-Engine Analytics Stack — Postgres, Timescale, ClickHouse, DuckDB"
date: 2026-05-15 10:00:00 +0000
categories: [Data Engineering, Software Architectures]
tags: [PostgreSQL, TimescaleDB, ClickHouse, DuckDB, Redis, Parquet, SQL, ETL]
description: "Right engine per workload — 10x time-series latency improvement with layered storage."
---

How I combine **PostgreSQL**, **TimescaleDB**, **ClickHouse**, **DuckDB**, and **Redis** in production stacks — each engine for what it does best, not one database for everything.

## Layered model

| Engine | Workload | Why |
|--------|----------|-----|
| **PostgreSQL** | OLTP, relational truth | ACID, joins, app state |
| **TimescaleDB** | Time-series, pgvector | Hypertables, SQL familiarity, **10x** latency win on range queries |
| **ClickHouse** | Medium-scale OLAP | Columnar aggregations, fast scans |
| **DuckDB** | Local Parquet analytics | Hive-style partitions, zero server for batch |
| **Redis** | Hot cache / pub-sub | Sub-ms reads, session state |

## Pattern: ingest → hot → warm → cold

1. **Real-time Go ETL** writes to Postgres/Timescale (**sub-second** ingestion)
2. Rollups and dashboards hit Timescale or ClickHouse depending on cardinality
3. Historical archives land as **Parquet** on disk/object storage
4. **DuckDB** queries Parquet for ad-hoc analysis without loading a cluster
5. **Redis** fronts hot keys (geo tiles, session, rate limits)

## Where this showed up

- Freelance analytics stack (2025–present) — **10x** time-series query improvement
- [Markets Platform](/posts/markets-platform-tradeplatform/) — Postgres + DuckDB PL, ClickHouse OLAP
- [go-fdp](https://github.com/eSlider/go-fdp) — DuckDB + Parquet for Binance history

## Anti-patterns avoided

- Running heavy OLAP on primary Postgres without extension offload
- Duplicating full datasets in three engines — derive via ETL, don't triple-write blindly
- Using DuckDB as a shared multi-writer server (it's an embedded analytics engine)

## Tech stack

PostgreSQL · TimescaleDB · ClickHouse · DuckDB · Redis · Parquet · Go ETL
