---
title: "Inventar & Docs — Cross-Repo Architecture Governance"
date: 2026-04-01 10:00:00 +0000
categories: [DevOps, Software Architectures]
tags: [Documentation, Gitea, ADR, ASR, Governance, Markdown]
description: "ASR/ADR inventar, docs sync between Gitea instances, and long-running technical notes (~310+ commits)."
---

**Inventar & Documentation** · 2020–present  
**Repositories**: [eSlider/inventar](https://github.com/eSlider/inventar), [eSlider/docs](https://github.com/eSlider/docs), inventar-sync

## Summary

Cross-repo **governance** and architecture documentation: **ASR/ADR inventar** (architecture decision records), sync tooling between Gitea instances, and long-running technical notes (`scratches`).

## Git activity

| Repository | My commits | Last active |
|------------|-----------|-------------|
| scratches (docs + root) | ~232 | 2025-12 |
| docs | ~52 | 2026-04 |
| inventar | ~21 | 2026-04 |
| inventar-sync | ~7 | 2026-04 |

## What it covers

- **Inventar** — canonical ASR/ADR structure for produktor.io / eSlider org repos
- **inventar-sync** — push/pull alignment between GitHub and [git.produktor.io](https://git.produktor.io)
- **docs / scratches** — platform standards, runbooks, migration notes

Pairs with [self-hosted AI delivery](/posts/self-hosted-ai-delivery-fabric/) and [Docker Compose patterns](/posts/docker-compose-stack-patterns/) as the documentation layer behind multi-repo platform work.

## Related

[produktor.io](/posts/produktor-io-proprodukt/) · [AI Fabric](/posts/ai-fabric-agent-delivery/)

