---
title: "Trading Algorithms — Binance Sync & Market Data UI"
date: 2026-01-10 10:00:00 +0000
categories: [Projects, Data Engineering]
tags: [Go, React, Trading, Grafana, Loki, Docker]
description: "Binance market data sync, React trading frontends, and observability stack."
---

Algorithmic trading tooling spanning **Binance market data sync**, React trading frontends, and observability — built as standalone OSS-style repos and in support of the Markets Platform contract.

## Key components

| Component | Focus |
|-----------|-------|
| `binance/sync-v3` | ~154 commits — primary sync service (2025–2026) |
| `trading-algorithms/front` | React trading UI |
| `polymarket` | Prediction-market experiments |

## Architecture

- **Go** sync services ingest exchange klines and trades
- **React/TypeScript** frontends for charting and strategy monitoring
- **Grafana + Loki + Promtail** for pipeline observability

## Docker Compose

`sync-v3/compose.yml` runs `binance-api`, `loki`, `promtail`, `grafana` — a minimal ops stack for sync health and latency dashboards.

## Related libraries

- [go-fdp](https://github.com/eSlider/go-fdp) — historical data proxy
- [go-trade](https://github.com/eSlider/go-trade) — unified market data model

## Tech stack

Go · TypeScript/React · Exchange APIs · Grafana · Loki
