---
title: "self-ca — Self-Hosted Certificate Authority"
date: 2026-06-21 10:00:00 +0000
last_modified_at: 2026-06-30 14:00:00 +0000
categories: [Projects, DevOps]
tags: [Go, Linux, Docker]
description: "Generate, store, and install private HTTPS certificates on iOS, Android, Windows, Linux, and macOS."
mermaid: true
---

**self-ca** is a self-hosted CA web service for generating and managing private HTTPS certificates — with install flows for mobile and desktop platforms.

**Repository**: [github.com/eSlider/self-ca](https://github.com/eSlider/self-ca)

## Architecture

```mermaid
graph TB
    subgraph Browser["Browser (Vuetify CDN)"]
        FORM["CA / cert creation form"]
        DL["Platform download hub"]
        GUIDE["Inline install checklists"]
    end

    subgraph Backend["Go API + storage"]
        API["REST / JSON API"]
        CRYPTO["crypto/x509 + ECDSA"]
        STORE["Filesystem PEM tree<br/>data/cas/"]
        EXPORT["Platform exporters<br/>.crt · .mobileconfig · scripts"]
        WEB["Embedded SPA<br/>internal/web/static"]
    end

    subgraph Clients["Client devices"]
        IOS["iOS / iPadOS"]
        AND["Android"]
        WIN["Windows"]
        LIN["Linux"]
        MAC["macOS"]
    end

    FORM ---> API
    DL --> API
    WEB --> API
    API --> CRYPTO
    CRYPTO --> STORE
    STORE --> EXPORT
    EXPORT --> IOS
    EXPORT --> AND
    EXPORT --> WIN
    EXPORT --> LIN
    EXPORT --> MAC
    GUIDE --> Clients
```

## Features

- Web UI for certificate issuance and renewal
- Platform-specific install helpers (iOS, Android, Windows, Linux, macOS)
- Go CLI for automation and scripting
- Embedded Vue 3 + Vuetify SPA — no frontend build step

## Use case

Homelab stacks (Gitea, OnlyOffice, [WebDAV](/posts/webdav-sharing-sftpgo-minio/), Matrix) often need trusted TLS on private networks. self-ca centralizes CA management instead of ad-hoc `mkcert` runs per machine.

## Stack

| Layer | Choice |
|-------|--------|
| Backend | Go 1.25+ — `internal/ca`, REST API, filesystem PEM store |
| Frontend | Vue 3 + Vuetify 3 via CDN |
| Storage | `data/cas/{ca-id}/` PEM tree |

## Tech stack

Go · Web UI · X.509 · ECDSA · CLI · Vue 3
