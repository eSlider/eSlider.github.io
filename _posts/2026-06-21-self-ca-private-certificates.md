---
title: "self-ca — Self-Hosted Certificate Authority"
date: 2026-06-21 10:00:00 +0000
categories: [Projects, DevOps]
tags: [Go, Linux, Docker]
description: "Generate, store, and install private HTTPS certificates on iOS, Android, Windows, Linux, and macOS."
---

**self-ca** is a self-hosted CA web service for generating and managing private HTTPS certificates — with install flows for mobile and desktop platforms.

**Repository**: [github.com/eSlider/self-ca](https://github.com/eSlider/self-ca)

## Features

- Web UI for certificate issuance and renewal
- Platform-specific install helpers (iOS, Android, Windows, Linux, macOS)
- Go CLI for automation and scripting
- Fits homelab and internal-service TLS without public CA dependency

## Use case

Homelab stacks (Gitea, OnlyOffice, WebDAV, Matrix) often need trusted TLS on private networks. self-ca centralizes CA management instead of ad-hoc `mkcert` runs per machine.

## Tech stack

Go · Web UI · X.509 · CLI
