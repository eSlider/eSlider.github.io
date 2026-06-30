---
title: "Edelweiss — Healthcare Knowledge Base & Federated Chat"
date: 2026-06-25 10:00:00 +0000
categories: [Projects, Software Architectures]
tags: [Healthcare, Neo4j, Qdrant, Matrix, WebRTC, WebDAV, RAG]
description: "DemoCare / pflege knowledge-base tooling, go-second-brain, and federated Matrix homeservers for healthcare partners."
pin: true
---

**Edelweiss** · 2025–present  
**Context**: Healthcare and pflege (DemoCare) knowledge-base, sharing, and communications infrastructure

## Summary

**Edelweiss** second-brain stack: CuraSoft integrations, WebDAV sharing, and **federated Matrix** chat for healthcare partners.

## Repositories & stacks

| Component | Focus |
|-----------|-------|
| [go-second-brain](https://github.com/eSlider/go-second-brain) / edelweiss | Markdown KB → Neo4j + Qdrant → Matrix RAG bot |
| webdav-sharing | MinIO, SFTPGo file sharing |
| sublimation | 2026 tooling experiments |
| curasoft/pyxamstore | CuraSoft integration path |

## Docker Compose (selected)

| Stack | Services |
|-------|----------|
| `edelweiss/compose.yml` | docs, neo4j, qdrant, kg-ingestor, matrix-bot |
| `webdav-sharing/docker-compose.yml` | MinIO, SFTPGo, bootstrap |

## Video assistant MVP

Matrix knowledge bot for Element — text, voice messages, and calls. **STT** → **Qdrant** + **Neo4j** GraphRAG → **Ollama** (Gemma / Bonsai) humanize → **TTS**; user feedback stores back into the knowledge graph.

[Architecture and diagrams →](/posts/edelweiss-video-assistant-mvp/)

## Federated Matrix / VoIP (healthcare partners)

Homeservers **`chat.pro-dukt.de`** and **`chat.medex-pflegedienst.de`** run the same RTC model as produktor (Synapse, coturn, LiveKit paths), federated with **`chat.produktor.io`**.

See [Matrix / WebRTC / VoIP production stacks](/posts/edelweiss-video-assistant-mvp/) for TURN, LiveKit SFU, and three-org federation ops.

## Related

[go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) · [Video assistant MVP](/posts/edelweiss-video-assistant-mvp/) · [produktor.io](/posts/produktor-io-proprodukt/)

