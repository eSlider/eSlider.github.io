---
title: "NAI / Edelweiss — Healthcare Knowledge Base & Federated Chat"
date: 2026-06-25 10:00:00 +0000
categories: [Projects, Software Architectures]
tags: [Healthcare, Neo4j, Qdrant, Matrix, WebRTC, WebDAV, RAG]
description: "DemoCare / pflege knowledge-base tooling, go-second-brain, and federated Matrix homeservers for healthcare partners."
pin: true
---

**NAI / Edelweiss** ecosystem · 2025–present  
**Context**: Healthcare and pflege (DemoCare) knowledge-base, sharing, and communications infrastructure

## Summary

Projects around the **Edelweiss** second brain and related NAI work: curasoft integrations, WebDAV sharing, and **federated Matrix** chat for healthcare partners.

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

## Federated Matrix / VoIP (healthcare partners)

Homeservers **`chat.pro-dukt.de`** and **`chat.medex-pflegedienst.de`** run the same RTC model as produktor (Synapse, coturn, LiveKit paths), federated with **`chat.produktor.io`**.

See [Matrix / WebRTC / VoIP production stacks](/posts/matrix-webrtc-voip-production/) for TURN, LiveKit SFU, and three-org federation ops.

## Related

[go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) · [Matrix / WebRTC](/posts/matrix-webrtc-voip-production/) · [produktor.io](/posts/produktor-io-proprodukt/)

**Portfolio detail**: [github.com/eSlider/cv — nai-edelweiss](https://github.com/eSlider/cv/blob/main/projects/nai-edelweiss/overview.md)
