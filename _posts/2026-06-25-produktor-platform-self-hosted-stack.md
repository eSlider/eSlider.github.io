---
title: "produktor.io Platform — Self-Hosted k3s, Office & AI Stack"
date: 2026-06-25 10:00:00 +0000
categories: [Companies, Software Architectures, DevOps]
tags: [Kubernetes, OnlyOffice, Ollama, Gitea, Docker, Matrix, Go]
description: "Current ProProdukt SL infra: k3s, OnlyOffice, Ollama, Gitea orange stacks, Matrix/WebRTC, 19+ compose stacks."
---

**ProProdukt SL / produktor.io** — platform phase · 2021–present  
**Role**: Founder / lead engineer  
**Platform**: [git.produktor.io](https://git.produktor.io) · [produktor.io](https://produktor.io)

Continues the [company line](/posts/produktor-io-proprodukt/) after the [VisCreation era](/posts/viscreation-magento-cms-era/). Feeds **ai-fabric**, **go-onlyoffice**, **go-second-brain**, and client-facing services.

## Key repositories (author commits)

| Project | Commits (approx.) | Focus |
|---------|------------------:|-------|
| ai-fabric | ~72 | Agent delivery automation |
| ui | ~73 | produktor UI |
| vidarr | ~70 | AI / Telegram bot experiments |
| onlyoffice | ~11 | Office deployment configs |
| go-ollama | ~16 | Ollama Go client |
| ollama-intel-gpu/arc | ~30 | Intel GPU inference |
| k3s (arc-1) | ~13 | Cluster configs |

## Docker Compose (selected)

| Stack path | Services |
|------------|----------|
| `onlyoffice/` | MinIO, OnlyOffice Document Server, S3 gateway |
| `ollama-intel-gpu/` | Ollama (SYCL), Open WebUI |
| `vidarr/` | AI bot + Grafana/Loki/Prometheus |
| `produktor/orange/gitea` | Gitea, MinIO, NPM, act_runner |
| `produktor/orange/chat` | Synapse, Element, coturn, LiveKit, Jitsi — [WebRTC post](/posts/edelweiss-video-assistant-mvp/) |
| `produktor/orange/n8n` | Workflow automation |
| `produktor/orange/mailing` | docker-mailserver |

**19+ compose stacks** local + arc-1 long-term archive.

## Tech stack

Go · Docker · k3s/Kubernetes · OnlyOffice · Gitea · Ollama · Open WebUI · MinIO · Grafana/Loki · n8n · Matrix · LiveKit · Jitsi · coturn · Intel IPEX GPU

## Related flagship OSS

[go-onlyoffice](/posts/go-onlyoffice-oo-cli/) · [AI Fabric](/posts/ai-fabric-agent-delivery/) · [go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) · [Compose patterns](/posts/docker-compose-stack-patterns/)

**Portfolio detail**: [github.com/eSlider/cv — produktor-platform](https://github.com/eSlider/cv/blob/main/projects/produktor-platform/overview.md)
