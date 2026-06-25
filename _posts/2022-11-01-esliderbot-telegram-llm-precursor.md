---
title: "eSliderbot — Early Telegram LLM Bot (2022–2025)"
date: 2022-11-01 10:00:00 +0000
categories: [Projects, Software Architectures]
tags: [Go, OpenAI, Telegram, SQLite, Grafana, LLM]
description: "~64 commits — OpenAI Telegram bot with audio recognition; precursor to vidarr and go-second-brain voice paths."
---

**eSliderbot** · 2022–2025 · **~64 author commits**  
**Successor line**: produktor.io **vidarr** → [go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) Matrix voice bot

## Summary

Early **AI Telegram bot** with OpenAI API integration, **audio recognition** (Whisper path), SQLite persistence, and OpenAPI logging. Production-minded stack with Grafana/Loki/Prometheus from the start.

## Features

- OpenAI API chat completions
- Audio recognition / speech input
- Telegram bot with context forks
- Go API service + SQLite
- Observability sidecar (Grafana, Loki, Promtail)

## Docker Compose

| Path | Services |
|------|----------|
| `esliderbot/docker-compose.yml` | `eslider-bot` + observability |
| `produktor.io/vidarr/docker-compose.yml` | Successor bot stack |

## Related

[AI Fabric](/posts/ai-fabric-agent-delivery/) · [go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) · [produktor platform](/posts/produktor-platform-self-hosted-stack/)

**Portfolio detail**: [github.com/eSlider/cv — esliderbot](https://github.com/eSlider/cv/blob/main/projects/esliderbot/overview.md)
