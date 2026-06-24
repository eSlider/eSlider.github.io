---
title: "Docker Compose Stack Patterns — 50+ Production Stacks"
date: 2026-06-01 10:00:00 +0000
categories: [DevOps, Software Architectures]
tags: [Docker, PostgreSQL, Grafana, Loki, MinIO, Gitea, Ollama, Linux]
description: "Recurring compose patterns across produktor.io, AI Fabric, trading, and GIS stacks."
---

Inventory-driven notes from **52 canonical Compose stacks** on the local workstation (128 on long-term archive) — the patterns that repeat across produktor.io, AI Fabric, trading, and GIS projects.

## Top technologies by stack count

| Technology | Stacks |
|------------|-------:|
| PostgreSQL | 40 |
| Grafana | 22 |
| MinIO | 19 |
| Loki | 18 |
| Redis | 15 |
| Promtail | 14 |
| Ollama | 6 |
| Gitea | 5 |
| OnlyOffice | 6 |
| Matrix / Synapse | 5 |

## Pattern 1 — Observability sidecar trio

**Grafana + Loki + Promtail** appears in 14+ stacks. Standard layout:

- Promtail tails container logs and host files
- Loki stores indexed logs (cheap retention)
- Grafana dashboards per service (`binance-api`, `gitea`, `onlyoffice`)

Used in: [trading sync](/posts/trading-algorithms-binance-sync/), Markets Platform, produktor orange stack.

## Pattern 2 — Self-hosted Git + CI

**Gitea + act_runner + MinIO** for artifact/S3-compatible storage:

- [AI Fabric](/posts/ai-fabric-agent-delivery/) — issue → PR automation
- produktor.io Gitea — private product repos

## Pattern 3 — AI inference plane

**Ollama + Open WebUI** (6 stacks) plus optional **Qdrant** / **Neo4j** for RAG:

- [go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) — full graph + vector pipeline
- produktor experiments — model serving without cloud API

## Pattern 4 — Document & collaboration

**OnlyOffice + PostgreSQL + RabbitMQ/MinIO** — document editing with S3-backed storage. Pairs with [go-onlyoffice](/posts/go-onlyoffice-oo-cli/) for task/calendar API automation.

## Pattern 5 — GIS data plane

**PostGIS + tileserver + nginx/php** — Mapbender and produktor geo stacks. See [WhereGroup](/posts/wheregroup-mapbender-gis/) and [Immowelt](/posts/immowelt-geospatial-search/).

## Operational habits

- One `compose.yml` per product — avoid mega-compose with 30 unrelated services
- Named volumes for Postgres/MinIO; bind mounts only for dev configs
- Profile flags (`profiles: [kg, bot]`) to spin subsets (go-second-brain pattern)
- Healthchecks on Postgres and Gitea before dependent services start

## Related stacks

[produktor.io](/posts/produktor-io-proprodukt/) · [AI Fabric](/posts/self-hosted-ai-delivery-fabric/) · [Analytics stack](/posts/analytics-stack-multi-engine/)
