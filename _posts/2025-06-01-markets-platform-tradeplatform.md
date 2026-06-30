---
title: "Markets Platform — TradePlatform Backend at Scale"
date: 2025-06-01 10:00:00 +0000
categories: [Companies, Software Architectures]
tags: [Go, React, Kafka, PostgreSQL, DuckDB, ClickHouse, Grafana, Microservices]
description: "~2,000+ commits on trading platform — consumers, APIs, React/MUI frontends."
---

**Markets Platform (TradePlatform)** · 2024–2025  
**Role**: Backend / platform engineer (**contract** — not employer)

## Highlights

- **~2,000+** author commits — highest volume engagement in recent git history
- Core platform (`TP-general-code` ~1,065 commits) and event consumers (`back-consumers` ~728)
- React/MUI frontends, data service layer, ATAS terminal integration

## Platform services

| Service | Role |
|---------|------|
| `api-service` / `api-watch` | Go REST + watchers |
| `postgresql` | Postgres + DuckDB/Python PL |
| `clickhouse` | OLAP analytics |
| `minio` | S3 object storage |
| `grafana` + `loki` + `promtail` | Observability |
| `n8n` | Workflow automation |
| `ws` | WebSocket service |
| Matrix chat (Illja) | Synapse, Element PWA, coturn — see [WebRTC stacks](/posts/edelweiss-video-assistant-mvp/) |

## Tech stack

Go · TypeScript/React · MUI · Kafka-style consumers · PostgreSQL · DuckDB · ClickHouse · MinIO · Grafana · Redis · Sentry · Matrix · WebRTC

## Related OSS

[Trading algorithms](/posts/trading-algorithms-binance-sync/) · [go-fdp](https://github.com/eSlider/go-fdp) · [go-trade](https://github.com/eSlider/go-trade)
