---
title: "LAMBDA — One Python App on AWS, GCP, and Azure Serverless"
date: 2026-06-25 12:00:00 +0000
categories: [Projects, DevOps, Software Architectures]
tags: [Python, AWS, GCP, Azure, Terraform, Lambda, Serverless, DuckDB]
description: "Shared business logic, per-cloud adapters, webhook ingest, and cross-cloud peer fan-out."
pin: false
---

**LAMBDA** is a minimal multi-cloud serverless experiment: one Python HTTP app deployed to **AWS Lambda**, **GCP Cloud Functions**, and **Azure Functions** from a single `src/` tree, with per-cloud Terraform roots and optional cross-region peer notification.

**Repository**: [github.com/eSlider/aws-gcp-azure](https://github.com/eSlider/aws-gcp-azure)

## Why one codebase, three clouds

Serverless runtimes differ in packaging, entry points, and blob APIs — but the HTTP surface and event model can stay identical. This repo tests that boundary: keep business logic cloud-agnostic, push adapters and Terraform into `infra/<cloud>/`, and build zip artifacts into `dist/` before apply.

## Layout

```
src/                    # routes, events, models — no cloud SDK imports
infra/
  aws/python/           # Lambda handler, S3 blob, DuckDB query
  gcp/python/           # Cloud Function, GCS blob
  az/python/            # Azure Function v2, blob storage
  */terraform/          # standalone state per cloud
dist/<cloud>/function.zip
bin/                    # build, apply, wire-peers, test
```

**Dependency rule**: `src/` never imports boto3, google-cloud, or azure SDKs. Cloud modules are lazy-imported inside handlers at package time.

## HTTP routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/health` | GET | Liveness |
| `/peers` | GET | Lists configured peer base URLs |
| `/webhook/{source}` | POST | Ingest JSON event → object storage |
| `/internal/event` | POST | Receive peer fan-out |
| `/query` | GET | AWS only — DuckDB over S3 JSON (hive paths) |

Events land under hive-style keys:

`events/source={source}/year=YYYY/month=MM/day=DD/hour=HH/{id}.json`

## Cross-cloud peers

After deploy on all three clouds, `bin/wire-peers.sh` writes `peers.auto.tfvars.json` so each function gets `LAMBDA_PEER_URLS`. On ingest, the handler stores locally and **fire-and-forgets** `POST /internal/event` to peers — enough to prove cross-cloud wiring without a message bus.

## Deploy loop

```bash
uv sync
source bin/load-env.sh
bash bin/build.sh all      # zips to dist/
bash bin/apply.sh          # terraform apply per cloud
bash bin/wire-peers.sh     # peer URLs
```

Smoke:

```bash
curl -s "$(terraform -chdir=infra/aws/terraform output -raw base_url)/health"
```

## Lessons learned

1. **GCP entry points** — zip root is the package root; expose `health` inline in `main.py`.
2. **Azure wheels** — vendor deps with manylinux py3.12 wheels at build time; `WEBSITE_RUN_FROM_PACKAGE` does not run Oryx pip.
3. **No `http.py`** — naming the adapter `http.py` shadows stdlib `http` and breaks tests.
4. **Per-cloud Terraform** — unified state does not migrate cleanly; use separate roots under `infra/*/terraform/`.
5. **Build before apply** — Terraform reads `dist/<cloud>/function.zip`; always rebuild after Python changes.

## Query path (AWS)

`GET /query?source=…&date=YYYY-MM-DD` runs DuckDB `read_json_auto` over the S3 glob for that hive partition — handy for quick inspection without spinning up Athena.

## Tech stack

Python 3.12 · Terraform · AWS Lambda + S3 · GCP Cloud Functions + GCS · Azure Functions + Blob · DuckDB · uv

## Related

- [Docker Compose stack patterns](/posts/docker-compose-stack-patterns/) — self-hosted contrast
- [Analytics multi-engine stack](/posts/analytics-stack-multi-engine/) — DuckDB in production-minded pipelines
- [Immowelt geospatial search](/posts/immowelt-geospatial-search/) — earlier AWS serverless migration work
