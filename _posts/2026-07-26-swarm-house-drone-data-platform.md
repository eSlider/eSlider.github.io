---
title: "Swarm House — On-Prem Data Platform for Autonomous Drone Swarms"
date: 2026-07-26 12:00:00 +0000
categories: [Clients, Projects, Software Architectures, DevOps]
tags: [Docker, Parquet, DuckDB, Kubernetes, Terraform, Ansible, Python, TypeScript, MinIO, Clients, Swarm House]
description: "Design and runnable PoC for an air-gapped drone-swarm data platform: Parquet/DuckDB, peer sync, ground warehouse, simulation."
---

**Engagement** · 2025–2026 · role: platform / DevOps design (client undisclosed)  
**Repo**: [swarm-house on git.produktor.io](https://git.produktor.io/eSlider/swarm-house)

An **on-prem, air-gapped data platform** sketch for autonomous drone swarms: high-rate telemetry and on-board detections stay local; only compact derived state crosses the mesh; full flights offload to a ground warehouse after landing.

## What was delivered

| Area | In-repo |
|------|---------|
| Design docs + ADRs | Problem → architecture → sync → security → CI/CD ([docs/](https://git.produktor.io/eSlider/swarm-house/src/branch/main/docs)) |
| Executive + journey | [00 — Executive](https://git.produktor.io/eSlider/swarm-house/src/branch/main/docs/00-executive.md) · [12 — Design journey](https://git.produktor.io/eSlider/swarm-house/src/branch/main/docs/12-design-journey.md) |
| Simulator | Virtual fleet writing Hive-partitioned Parquet / DuckDB |
| Prototypes | 2D (and 3D WIP) swarm visualization — React / TypeScript / Vite |
| Infra PoC | Ansible host prep · Terraform sim/ground · Flux overlays · k3d warehouse with MinIO |

## Design principles (short)

1. Every drone is autonomous — no swarm-wide orchestrator over intermittent mesh.  
2. One storage layout on drone, warehouse, and bench (Parquet + DuckDB).  
3. Sync **results**, not raw high-rate telemetry, while airborne.  
4. Zero-trust keys provisioned ahead of deployment.  
5. SQL as the peer query contract (read-only gate / forced-command path).

## Links

- Repository: [git.produktor.io/eSlider/swarm-house](https://git.produktor.io/eSlider/swarm-house)  
- [README](https://git.produktor.io/eSlider/swarm-house) · [ADRs](https://git.produktor.io/eSlider/swarm-house/src/branch/main/docs/adr) · [CI/CD notes](https://git.produktor.io/eSlider/swarm-house/src/branch/main/docs/11-cicd-delivery.md)

Client identity is omitted on purpose; this page describes the **technical work** only.
