---
title: "Go config: many good pieces, no whole picture"
date: 2026-05-02 10:00:00 +0000
categories: [Projects, Programming]
tags: [Go, Configuration, CLI, Viper, Koanf]
description: "Why nested Go config needs an explicit map-in-the-middle — and how go-config addresses merge, normalisation, and symmetric codecs."
---

**Published**: [Medium — 2026-05-02](https://medium.com/@andreyoblivantsev/go-config-many-good-pieces-no-whole-picture-039ec77193be) · 8 min read  
**Repository**: [github.com/eSlider/go-config](https://github.com/eSlider/go-config)

## Thesis

Go has strong config libraries — **Viper**, **Koanf**, **envconfig**, **godotenv**, format parsers, **mapstructure** — but most optimise for one slice of the problem. Production services need three jobs at once:

1. **Parse** a format (YAML, JSON, INI, dotenv)
2. **Compose** layers with predictable precedence (defaults → file → local → env)
3. **Decode** into a typed `Config` struct with sane key aliasing

Nested structs, embedded fields, and cross-format key names (`sub-service` vs `SUB_SERVICE`) are where the seams show.

## “Map in the middle”

The pattern that keeps working:

```
bytes → nested map[string]any → mapstructure → struct
```

Parsers own the left arrow; mapstructure owns the right. The **middle** — canonical nested maps, deep merge, key normalisation — is what teams reinvent in every repo.

## Where go-config fits

[go-config](https://github.com/eSlider/go-config) targets that middle layer with symmetric codecs across **env / yaml / json / ini**, deep merge, **LowerAlnum** normalisation, and **`envc` CLI** for `convert / get / merge`. Design scope and breaking changes from v0.1.0 are documented in the repo [ASR index](https://github.com/eSlider/go-config/blob/main/docs/asr/README.md).

Not a benchmark shoot-out — a map of ecosystem trade-offs (Viper env binding, Koanf composability, env-first loaders) and a concrete library answer.

## Links

- **Full essay**: [medium.com/@andreyoblivantsev/…](https://medium.com/@andreyoblivantsev/go-config-many-good-pieces-no-whole-picture-039ec77193be)
- **README**: [github.com/eSlider/go-config](https://github.com/eSlider/go-config/blob/main/README.md)
- **Repository**: [github.com/eSlider/go-config](https://github.com/eSlider/go-config)
- **Library cluster**: [Go libraries toolkit](/posts/go-libraries-toolkit/)
