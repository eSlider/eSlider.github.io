---
title: "go-fdp & go-trade — Finance Data Proxy and Market Model"
date: 2026-05-27 10:00:00 +0000
last_modified_at: 2026-06-30 14:00:00 +0000
categories: [Projects, Data Engineering]
tags: [Go, DuckDB, Parquet, Trading, SQL]
description: "Binance historical klines from public S3, DuckDB + Parquet cache, unified cross-exchange market data model."
mermaid: true
---

Two complementary Go libraries for market data: a **finance data proxy** and a **unified trading data model**.

**Repositories**:

- [github.com/eSlider/go-fdp](https://github.com/eSlider/go-fdp) — Binance historical klines & aggTrades from public S3 → DuckDB + Parquet cache → REST API
- [github.com/eSlider/go-trade](https://github.com/eSlider/go-trade) — cross-exchange model for candles, trades, orders, instruments, symbols, currencies

## go-fdp architecture

```mermaid
graph TB
    subgraph "Data sources"
        S3["Binance Vision S3<br/>data.binance.vision"]
        API["Binance REST<br/>api.binance.com"]
    end

    subgraph "go-fdp"
        ETL["pkg/binance<br/>S3 bulk + live hours"]
        APIpkg["pkg/binance<br/>REST klines · aggTrades"]
        MKT["internal/market.API<br/>lazy gap repair"]
        STORE["internal/store<br/>DuckDB over Parquet"]
        HTTP["internal/handler<br/>REST /v1/* gzip"]
    end

    subgraph "Storage"
        PQ["Parquet + Hive partitions<br/>data/mtype=spot/..."]
    end

    S3 -->|"anonymous S3"| ETL
    APIpkg -->|"today's candles"| PQ
    ETL --> PQ
    HTTP --> MKT
    MKT --> ETL
    MKT --> APIpkg
    MKT --> STORE
    STORE --> PQ
```

### Raw files vs queryable history

```mermaid
graph LR
    subgraph "Without FDP"
        DL["Download ZIPs<br/>from Binance Vision"]
        MAN["Manual unzip<br/>+ CSV parsing"]
        ADH["Ad-hoc scripts<br/>per symbol / day"]
    end

    subgraph "With go-fdp"
        REQ["GET /v1/data<br/>from · to · market"]
        AUTO["Auto ETL + cache"]
        OUT["JSON candles<br/>or aggTrades"]
    end

    DL --> MAN --> ADH
    REQ --> AUTO --> OUT
```

**Without a proxy:** manage S3 paths, daily ZIP layouts, decompression, schema mapping, and missing “today” data yourself.

**With FDP:** request a time range; the service fetches missing Parquet from S3 (or live API for the current day), runs DuckDB, and returns JSON.

## go-trade — unified data model

Exchange-agnostic types so Binance, CME, NASDAQ, and forex connectors normalize into the same structs.

```mermaid
graph TB
    subgraph "Exchange Connectors"
        BIN["Binance"]
        CME["CME Group"]
        NAS["NASDAQ"]
        FX["Forex Brokers"]
        CEX["Other CEX/DEX"]
    end

    subgraph "go-trade — Unified Data Model"
        TAS["TimeAndSale<br/>Atomic trade events"]
        CND["Candle<br/>OHLC + microstructure"]
        OB["OrderBook<br/>Bid/Ask snapshots"]
        ORD["Order<br/>Trade orders"]
        INS["Instrument<br/>Tradeable assets"]
        MKT["Market<br/>Trading pairs"]
        SYM["Symbol<br/>Hierarchical asset tree"]
        CUR["currency.Provider<br/>170+ fiat, 60+ crypto"]
    end

    subgraph "Storage & Analysis"
        DB["TimescaleDB<br/>PostgreSQL"]
        PQ["Parquet Files"]
        DASH["Analytics<br/>Dashboard"]
    end

    BIN -->|"normalize"| TAS
    CME -->|"normalize"| TAS
    NAS -->|"normalize"| TAS
    FX -->|"normalize"| TAS
    CEX -->|"normalize"| TAS

    TAS --> CND
    TAS --> OB

    TAS --> DB
    CND --> DB
    OB --> PQ
    ORD --> DB

    DB --> DASH
    PQ --> DASH

    INS -.->|"classifies"| TAS
    MKT -.->|"identifies"| INS
    SYM -.->|"defines"| MKT
    CUR -.->|"resolves"| SYM
```

### Normalization flow

```mermaid
sequenceDiagram
    participant Exchange
    participant Connector
    participant Model as go-trade Model
    participant Store

    Exchange->>Connector: Raw trade event (JSON/WebSocket)
    Connector->>Connector: Parse exchange-specific format
    Connector->>Model: trade.TimeAndSale{Ticker, Price, Volume, Side}
    Model->>Store: Normalized row

    Note over Model: Same struct regardless<br/>of source exchange
```

## How they compose

- **go-fdp** — ingest and cache historical Binance data
- **go-trade** — shared type system for sync services and trading frontends
- Used by [Trading algorithms](/posts/trading-algorithms-binance-sync/) and [Markets Platform](/posts/markets-platform-tradeplatform/)

## Tech stack

Go · DuckDB · Parquet · Binance API · TimescaleDB · REST
