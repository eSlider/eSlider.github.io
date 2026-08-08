---
title: "MomSwap — GeoJSON Collections with Ed25519 Auth"
date: 2026-08-08 06:00:00 +0000
categories: [Clients, Projects, Software Architectures]
tags: [Go, GeoJSON, Ed25519, MinIO, Vue, Geospatial, Clients, ProProdukt]
description: "User-owned GeoJSON feature collections — Ed25519 challenge-response auth, invitation onboarding, MinIO assets, static Vue frontend."
---

**Product** · ProProdukt SL / produktor.io · 2024–present  
**Repo**: [momswap/backend on git.produktor.io](https://git.produktor.io/momswap/backend)  
**Live**: [tenerife.baby](https://tenerife.baby/)

MomSwap is a small geospatial SaaS: each user owns **GeoJSON feature collections** (points and related assets), authenticated with **Ed25519** instead of passwords.

## What ships

| Area | Detail |
|------|--------|
| Auth | Challenge → login (`/v1/auth/challenge`, `/v1/auth/login`); register with ownership proof |
| Onboarding | Hybrid invitations — signed invite payload + inviter lineage |
| Data | Per-user collections and Point feature CRUD |
| Assets | Object storage on MinIO |
| Frontend | Static no-build Vue + Vuetify (`web/`) from CDN |
| Client lib | TypeScript `@noble/ed25519` API client (`libs/geo-api-client`) |
| CI | Gitea Actions — Go tests + Bun client tests |

## Why Ed25519

Password resets and shared secrets do not fit a invite-first geo product. Keys prove control of the identity; the service verifies signatures. Bootstrap uses an admin/service public key for `register-by-signature`.

## Stack

Go API · PostgreSQL · MinIO · Vue / Vuetify · Bun tests · Docker Compose (including a `test` profile so `var/` stays runtime-only).

## Links

- Backend: [git.produktor.io/momswap/backend](https://git.produktor.io/momswap/backend)
- Company / platform: [produktor.io](/posts/produktor-io-proprodukt/) · [Platform stack](/posts/produktor-platform-self-hosted-stack/)
- Governance SSOT framing: [Workspace catalog & OnlyOffice](/posts/workspace-catalog-onlyoffice-ssot/)
