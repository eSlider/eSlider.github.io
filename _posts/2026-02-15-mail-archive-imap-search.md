---
title: "mail-archive — IMAP Archive with DuckDB & Qdrant Search"
date: 2026-02-15 10:00:00 +0000
categories: [Projects, Data Engineering]
tags: [Go, DuckDB, Qdrant, RAG, SQL]
description: "IMAP/POP3 mail archive with structured storage and semantic search."
---

**mail-archive** archives mail from IMAP/POP3 sources into queryable storage with optional vector search.

**Repository**: [github.com/eSlider/mail-archive](https://github.com/eSlider/mail-archive)

## Architecture

- Pull mail via IMAP/POP3
- Store structured metadata and bodies in **DuckDB**
- Optional **Qdrant** embeddings for semantic search across archived threads
- Go CLI and services for ingestion and query

## Use case

Long-running mailboxes accumulate context that standard clients search poorly. Archiving to DuckDB enables SQL analytics; Qdrant adds "find similar discussions" without exporting to a third-party service.

## Tech stack

Go · DuckDB · Qdrant · IMAP/POP3
