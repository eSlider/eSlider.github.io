---
title: "go-quicktype — Backendless Typed Models in the Browser"
date: 2026-06-30 12:00:00 +0000
categories: [Projects, Programming]
tags: [TypeScript, Go, JSON, GraphQL, JavaScript]
description: "Fork of quicktype with a client-side web app — JSON, Schema, TypeScript, GraphQL → 25+ target languages, no server."
---

**go-quicktype** is a fork of [quicktype](https://github.com/quicktype/quicktype) that ships a **backendless browser web app** at **[eslider.github.io/go-quicktype](https://eslider.github.io/go-quicktype/)** — all transformations run client-side; sample data never leaves the browser.

**Repository**: [github.com/eSlider/go-quicktype](https://github.com/eSlider/go-quicktype)

## What it does

`quicktype` generates strongly-typed models and serializers from:

| Input | Examples |
|-------|----------|
| JSON | Sample objects, API responses |
| JSON Schema | Validated document shapes |
| TypeScript | Interface definitions |
| GraphQL | Query result types |

**25+ target languages** — Go, Rust, Python, C#, Java, Kotlin, Swift, TypeScript, and more.

## Why a browser fork

Upstream [app.quicktype.io](https://app.quicktype.io) is excellent but depends on hosted infrastructure. This fork:

- Runs entirely in the browser (offline-capable after first load)
- Publishes static assets to GitHub Pages under the eSlider org
- Keeps the full quicktype engine + CLI in the same repo for local/CI use

## Typical workflow

```bash
# CLI (global install)
npm install -g quicktype
echo '{ "name": "David" }' | quicktype -l go -o person.go

# Or paste JSON in the browser app and export Go structs
```

Recommended pipeline for teams:

1. Generate JSON Schema from sample data
2. Review and commit the schema to the repo
3. Generate language bindings in CI from the schema — single source of truth

## Use cases

- **API client codegen** — REST response → Go/Rust/Python structs
- **Config validation** — JSON Schema → typed loaders (pairs well with [go-config](/posts/go-config-many-good-pieces-no-whole-picture/))
- **GraphQL clients** — query → typed models without hand-maintaining DTOs
- **Interop** — same schema → multiple language bindings for polyglot microservices

## Related

[Go libraries toolkit](/posts/go-libraries-toolkit/) · [Markets Platform TradePlatform](/posts/markets-platform-tradeplatform/) (typed exchange models)

## Tech stack

TypeScript · quicktype engine · GitHub Pages · npm CLI
