---
title: "go-fdp & go-trade — Finance Data Proxy and Market Model"
date: 2026-05-27 10:00:00 +0000
categories: [Projects, Data Engineering]
tags: [Go, DuckDB, Parquet, Trading, SQL]
description: "Binance historical klines from public S3, DuckDB + Parquet cache, unified cross-exchange market data model."
---

Two complementary Go libraries for market data: a **finance data proxy** and a **unified trading data model**.

**Repositories**:

- [github.com/eSlider/go-fdp](https://github.com/eSlider/go-fdp) — Binance historical klines & aggTrades from public S3 → DuckDB + Parquet cache → REST API
- [github.com/eSlider/go-trade](https://github.com/eSlider/go-trade) — cross-exchange model for candles, trades, orders, instruments, symbols, currencies

## go-fdp architecture

1. Fetch Binance public S3 archives (klines, aggTrades)
2. Normalize and cache in **DuckDB** with **Parquet** on disk
3. Expose REST API for downstream consumers (charts, backtests, sync jobs)

## go-trade role

Provides a single Go type system so exchange-specific payloads map to shared structs — used by sync services and trading frontends without duplicating model definitions.

## Tech stack

Go · DuckDB · Parquet · Binance API · REST
