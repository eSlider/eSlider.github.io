---
title: "carbonyl — Chromium Browser That Renders to the Terminal"
date: 2026-06-30 13:00:00 +0000
categories: [Projects, DevOps]
tags: [Docker, Linux, Chromium, SSH, Browser]
description: "Fork tracking Chromium M147 — 60 FPS terminal browser, 0% idle CPU, GHCR images, SSH-friendly."
---

**carbonyl** is a Chromium-based browser that renders into **terminal text** — WebGL, video, and animations at ~60 FPS, 0% CPU when idle, no window server required. Works over SSH.

This fork ([eSlider/carbonyl](https://github.com/eSlider/carbonyl)) tracks the actively maintained [jmagly/carbonyl](https://github.com/jmagly/carbonyl) line (originally [fathyb/carbonyl](https://github.com/fathyb/carbonyl)) and ships runnable images via **[ghcr.io/eslider/carbonyl](https://github.com/eSlider/carbonyl/pkgs/container/carbonyl)**.

## What it is

Carbonyl started as `html2svg` — a path from Chromium's render tree to terminal glyphs. Unlike headless Chrome + screenshot pipelines, it is a native terminal UI: fast startup, low idle cost, safe-mode console friendly.

| Property | Value |
|----------|-------|
| Chromium track | M147 stable |
| Runtime | Verified upstream release tarballs |
| Images | `ghcr.io/eslider/carbonyl` (Docker workflow on `main` + `v*` tags) |
| Automation SDK | [carbonyl-agent](https://github.com/jmagly/carbonyl-agent) (Python) |

## Get started

### Docker (CLI browsing)

```bash
docker run --rm -it ghcr.io/eslider/carbonyl https://example.com
```

### Python automation (recommended for scripts)

```bash
pip install carbonyl-agent
carbonyl-agent install   # verified runtime binary
```

```python
from carbonyl_agent import CarbonylBrowser

b = CarbonylBrowser()
b.open("https://example.com")
b.drain(8.0)
print(b.page_text())
b.close()
```

For multi-instance orchestration (gRPC + REST fleet), see [carbonyl-fleet](https://github.com/jmagly/carbonyl-fleet).

## Fork role

Most users should **not** build Chromium. This repo packages verified runtime tarballs into GHCR images — CI builds when Docker files change on `main` or on version tags.

Use cases in my stacks:

- **SSH-only servers** — quick page inspection without X11 forwarding
- **Agent browsing** — carbonyl-agent drives headless terminal sessions for scraping and testing
- **Homelab ops** — lightweight smoke checks from a jump host

## Comparisons

| Approach | Terminal-native | Idle CPU | Full Web APIs |
|----------|-----------------|----------|---------------|
| carbonyl | Yes | ~0% | Yes (Chromium) |
| lynx / w3m | Yes | Low | No (text browsers) |
| headless Chrome + imgcat | No | Higher | Yes |

## Related

[produktor.io platform](/posts/produktor-platform-self-hosted-stack/) · [Docker Compose patterns](/posts/docker-compose-stack-patterns/)

## Tech stack

Chromium · Rust/C++ fork · Docker · GHCR · carbonyl-agent
