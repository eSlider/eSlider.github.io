---
title: "AI Fabric — Agent-Driven Delivery on Gitea"
date: 2026-06-14 10:00:00 +0000
categories: [Projects, DevOps]
tags: [Go, Gitea, Docker, GitHub Actions, LLM, MCP, Microservices]
description: "Self-hosted issue → implement → CI → PR automation with Telegram control."
pin: true
---

**AI Fabric** is a self-hosted **AI software-delivery fabric** for Gitea-based teams. It automates the path from issue to merged PR with policy gates and human approval checkpoints.

**Repository**: [github.com/eSlider/ai-fabric](https://github.com/eSlider/ai-fabric)

## How it works

1. Gitea issue opened or assigned
2. Agent plans and implements on a feature branch
3. CI runs `fmt`, `lint`, `test` with retry loops
4. PR opened with structured body; human approves merge
5. **Telegram bot** provides status and control hooks

## Services

| Service | Role |
|---------|------|
| `gitea` | Source of truth — issues, branches, PRs, Actions |
| `gitea-runner` | Gitea act_runner replicas |
| `issue-handler` | Go service — issue → PR pipeline |
| `tg-bot` | Telegram control bot |
| `gitea-mcp` | MCP bridge for agent tooling |

## Outcomes

- ~72 author commits; active development through 2026
- Policy-gated agent delivery — not "merge whatever the LLM writes"
- Fully self-hosted on Docker Compose — no GitHub dependency for the fabric itself

## Tech stack

Go · Gitea API · Gitea Actions · Docker Compose · Telegram Bot API · MCP
