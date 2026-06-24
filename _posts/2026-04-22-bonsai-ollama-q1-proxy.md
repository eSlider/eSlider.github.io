---
title: "bonsai-ollama — Ollama Proxy for Q1_0 GGUF Models"
date: 2026-04-22 10:00:00 +0000
categories: [Projects, Programming]
tags: [Go, Ollama, LLM, Docker]
description: "HTTP proxy for PrismML Bonsai 1.7B Q1_0 via llama-server — stock Ollama cannot load Q1_0 yet."
mermaid: true
---

**bonsai-ollama** is an Ollama-facing HTTP proxy for **PrismML Bonsai 1.7B** (`Q1_0` GGUF) via `llama-server` — because stock Ollama cannot load `Q1_0` quantizations yet.

**Repository**: [github.com/eSlider/bonsai-ollama](https://github.com/eSlider/bonsai-ollama) · last push **2026-04-22** · ★2

## Problem

Ultra-low-bit quants (`Q1_0`) save VRAM but need a loader that supports them. Ollama's native loader rejects some formats — this proxy exposes an **OpenAI-compatible** surface while `llama-server` handles the model file.

## Stack position

```mermaid
flowchart LR
  Client[OpenAI-compatible client] --> Proxy[bonsai-ollama]
  Proxy --> LlamaServer[llama-server]
  LlamaServer --> GGUF[Bonsai Q1_0 GGUF]
```

## Related

- [go-ollama](/posts/go-libraries-toolkit/) — Go client for Ollama + Open WebUI
- [go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) — Ollama embed/generate in RAG stack

## Tech stack

Go · llama-server · GGUF · HTTP proxy · Ollama API compatibility
