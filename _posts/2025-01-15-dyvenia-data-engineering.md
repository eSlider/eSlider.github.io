---
title: "Dyvenia — Senior Data Engineer (Python ETL & CRM Pipelines)"
date: 2025-01-15 10:00:00 +0000
categories: [Companies, Data Engineering]
tags: [Python, FastAPI, PostgreSQL, dbt, Parquet, ETL, SQL, ARQ, HubSpot, Salesforce]
description: "Python data engineering on Atttiva/IDflow — FastAPI, ARQ workers, CRM consumers, dbt/Parquet ELT, 10M+ records, 99.9% quality."
---

**[Dyvenia](https://dyvenia.com/)** · Remote (Tenerife, Spain) · Mar 2023 – Jan 2025  
**Role**: **Senior Data Engineer** (employee) — **Python** application and pipeline work, not platform/SRE ownership  
**Company**: Data consultancy — Kraków (HQ) + [Tenerife hub](https://dyvenia.com/careers/)

## Highlights

- Built **Python** ETL/ELT on **Atttiva / IDflow** — **FastAPI** APIs, **ARQ** async workers, HubSpot/Salesforce **consumer** services — processing **10M+ records** with **99.9%** automated data-quality checks
- Optimized **PostgreSQL**, **Parquet**, and **dbt** models; **~60%** faster report processing on heavy ELT paths
- Tuned database and **Redis** cache usage; improved pipeline reliability and release safety (tests, versioned deploys)
- Deployed on **Kubernetes** (product runtime); day-to-day work was **Python/SQL** pipeline code and data models, not cluster engineering

## Primary product — Atttiva / IDflow

**~588 unique author commits** (canonical `dyvenia/atttiva` checkout on arc-1). Private `dyvenia/atttiva` on GitHub.

| Layer | Stack |
|-------|--------|
| **Application** | **Python** — FastAPI, ARQ workers (`arq_transformer`, `arq_sender`, `arq_customer_intent`) |
| **Integrations** | HubSpot + Salesforce consumers (consent, contacts, lifecycle, installer requests, …) |
| **Data** | **PostgreSQL**, **Redis**, **MinIO**; **dbt** + **Parquet** ELT |
| **Ops** | Grafana, Loki, Promtail (observability around pipelines) |
| **Runtime** | Docker Compose locally; **Kubernetes** for deployed environments |

**VELUX** client: **IDflow** on Azure DevOps — migration branch toward Atttiva (`idflow-migration-365`).

## Other contributions

- Dyvenia **CI templates** (`ci-tests`, `test-ci-pull-requests`, `BuildPipelineTemplate`) — Python pipeline test harnesses
- [viadot](https://github.com/dyvenia/viadot) — **Python** OSS ETL library; feature branches + **9 PR reviews**
- Light **Azure** client exposure (VELUX); primary depth is Python data apps on Atttiva

## Employer context (dyvenia.com)

Consultancy focus: [Data Service](https://dyvenia.com/solutions/data-service/) — Python ingestion, **dbt**, Prefect/Airflow orchestration, Databricks/Snowflake ops ([Prefect case study](https://www.prefect.io/blog/why-dyvenia-adopted-prefect)). My tenure matched that profile: **Python + SQL** delivery on a CRM/ERP-style product line.

## Scale

~625 unique author commits (hash-deduped across employer archive `8TB/dyvenia/`).

## Tech stack (what I actually shipped)

**Python** · FastAPI · ARQ · SQL · PostgreSQL · **dbt** · Parquet · Redis · HubSpot/Salesforce APIs · Kubernetes (deployment) · Grafana/Loki

## Links

- Employer: [dyvenia.com](https://dyvenia.com/) · [viadot](https://github.com/dyvenia/viadot)
- Related posts: [Dyvenia data engineering](/posts/dyvenia-data-engineering/) · [dyvenia.com](https://dyvenia.com/)
- Prior: [Immowelt (Go)](/posts/immowelt-geospatial-search/) · Next: [Markets Platform (Go)](/posts/markets-platform-tradeplatform/)
