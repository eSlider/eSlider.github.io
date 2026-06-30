---
title: "go-second-brain — Knowledge Graph RAG Platform"
date: 2026-06-16 10:00:00 +0000
categories: [Projects, Software Architectures]
tags: [Go, Neo4j, Qdrant, Ollama, RAG, Matrix, Docker, LLM]
description: "Markdown KB → Neo4j + Qdrant → Matrix RAG bot and voice assistant."
pin: true
---

Self-hosted **second brain** platform: a Markdown knowledge base flows into a **Neo4j** knowledge graph and **Qdrant** vector store, then serves answers through a **Matrix** RAG bot and optional voice assistant.

**Repository**: [github.com/eSlider/go-second-brain](https://github.com/eSlider/go-second-brain)

## Architecture

- **Ingest**: `docsparse` parses Markdown corpus → graph nodes/edges in Neo4j and embedded chunks in Qdrant
- **RAG**: hybrid retrieval (vector search + graph-linked context) → **Ollama** generation
- **Serving**: Matrix bot (`!brain` prefix), optional low-latency voice CLI (STT/TTS)
- **SDK**: public Go packages (`services/pkg/*`) shipped Jun 2026

## Docker Compose stack

| Service | Role |
|---------|------|
| `docs` | MkDocs knowledge base |
| `neo4j` | Knowledge graph |
| `qdrant` | Vector store |
| `kg-ingestor` | Markdown → graph + embeddings |
| `matrix-bot` | Matrix RAG + voice bot |

## Outcomes

- Hybrid **GraphRAG** retrieval combining vector similarity and graph traversal
- Self-hosted AI stack — no external LLM API required when using Ollama
- Production-oriented Go SDK for embedding the pipeline in other services

## Tech stack

Go · Neo4j (Cypher) · Qdrant · Ollama · Matrix · Docker Compose

## Related

[Matrix / WebRTC / VoIP production stacks](/posts/edelweiss-video-assistant-mvp/) · [produktor.io](/posts/produktor-io-proprodukt/)

**Portfolio detail**: [github.com/eSlider/cv — go-second-brain](https://github.com/eSlider/cv/blob/main/projects/go-second-brain/overview.md)
