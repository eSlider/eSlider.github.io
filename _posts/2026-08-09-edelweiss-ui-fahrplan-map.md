---
title: "Edelweiss UI — Phone-First Fahrplan Map (CuraSoft)"
date: 2026-08-09 10:00:00 +0000
categories: [Clients, Projects, Software Architectures]
tags: [Healthcare, Go, Vue, MapLibre, Geospatial, Docker, Edelweiss, Curasoft, Clients]
description: "edelweiss-ui: daily care routes on a map — Go API + Vue/MapLibre, read-only CuraSoft snapshot, deployed on client infra."
---

**Edelweiss** ambulatory care · product **edelweiss-ui** · 2026  
**Role**: Platform / product engineering via **ProProdukt SL**  
**Code**: [git.produktor.io/edelweiss/edelweiss-ui](https://git.produktor.io/edelweiss/edelweiss-ui) (private client org)

Phone-first map of daily **Fahrpläne**: who visits which patients, where, and when — built on a **read-only** CuraSoft / Edelweiss data snapshot plus geocoding, not a write-back into the care system.

## What it is

| Layer | Stack | Public edge |
|-------|--------|-------------|
| API | Go (stdlib HTTP) | `back.pro-dukt.de` |
| UI | Vue 3 · Pinia · Vuetify · MapLibre GL | `ui.pro-dukt.de` |
| Data | Postgres forensic snapshot + TempListe CSV + Photon geocoder | on-prem host |
| Ops | Docker Compose · Nginx Proxy Manager · Gitea Actions CI | `naj-arc-edelweiss` |

Access is gated by a shared Bearer key (rotated ops-side). Patient-related data stays on the client network; this post describes architecture only.

## Why it exists

CuraSoft already holds routes and staff calendars. Field leads need a **map + timeline** on a phone without changing the source of truth. The UI loads day plans, staff history, patient search, and (newer) **demand calendar** estimates — with an explicit banner that estimates are not Abrechnung.

## Architecture (short)

```text
Browser (phone)
  → ui.pro-dukt.de  (SPA + /api proxy)
  → Go API          (host network)
       ├─ Postgres cs_edw (read-only)
       └─ Photon (local OSM geocode, DE)
```

Startup loads staff/patients, fuzzy-matches TempListe addresses, geocodes via Photon (cached), and parses route blobs on demand. Frontend: MapLibre layers, swipeable day strip, filters, stop lists — TDD with `go test` + `bun test`; CI in Gitea Actions.

## Related Edelweiss work

- [Healthcare knowledge base / Matrix federation](/posts/edelweiss-healthcare-knowledge-base/)
- [Video assistant MVP](/posts/edelweiss-video-assistant-mvp/)
- [Matrix / WebRTC production](/posts/matrix-webrtc-voip-production/)

OnlyOffice: **#216** `DE | Edelweiss | Fahrplan Map (edelweiss-ui)` (Contacts: Edelweiss + Curasoft).

## Stack

Go · Vue 3 · Vuetify · MapLibre · Postgres · Photon · Docker · Gitea
