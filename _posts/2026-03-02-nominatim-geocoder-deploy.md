---
title: "nominatim — OpenStreetMap Geocoder Deployment Recipes"
date: 2026-03-02 10:00:00 +0000
categories: [Projects, DevOps]
tags: [Docker, Geospatial, Linux, PostgreSQL]
description: "Nominatim deployment scripts for self-hosted OSM geocoding — part of produktor.io geo stack."
---

**nominatim** holds deployment scripts and Docker recipes for a self-hosted **[Nominatim](https://nominatim.org/)** geocoder — OpenStreetMap address search on your own infrastructure.

**Repository**: [github.com/eSlider/nominatim](https://github.com/eSlider/nominatim) · last push **2026-03-02**

## Context

Part of the **produktor.io** geospatial line alongside [geo-tools](https://github.com/eSlider/geo-tools), [geo-spider-app](/posts/geo-spider-app-android-gps/), and historical VisCreation/produktor tile stacks.

## Use case

- Self-hosted geocoding without third-party API quotas
- Pairs with PostGIS / tileserver stacks for full geo pipeline
- Reference deployment for homelab and client projects

## Related

- [Immowelt geospatial search](/posts/immowelt-geospatial-search/) — 80M+ addresses at employer scale
- [produktor.io](/posts/produktor-io-proprodukt/) — company geo platform

## Tech stack

Shell · Docker · PostgreSQL/PostGIS · Nominatim · OpenStreetMap
