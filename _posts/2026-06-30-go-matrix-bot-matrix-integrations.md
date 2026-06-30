---
title: "go-matrix-bot — Matrix Bots with E2E, Ollama, Gitea, and OnlyOffice"
date: 2026-06-30 11:00:00 +0000
categories: [Projects, Programming, Software Architectures]
tags: [Go, Matrix, Ollama, Gitea, LLM, E2E]
description: "Go library for encrypted Matrix bots — AI assistants, Gitea issue queries, and OnlyOffice task creation from chat."
mermaid: true
---

**go-matrix-bot** is a Go library for building [Matrix](https://matrix.org/) bots with **end-to-end encryption**, built on [mautrix-go](https://github.com/mautrix/go). It composes with [go-ollama](https://github.com/eSlider/go-ollama), [go-gitea-helpers](https://github.com/eSlider/go-gitea-helpers), and [go-onlyoffice](https://github.com/eSlider/go-onlyoffice) for AI and project-management workflows in chat.

**Repository**: [github.com/eSlider/go-matrix-bot](https://github.com/eSlider/go-matrix-bot)

## Architecture

```mermaid
graph TB
    subgraph "Matrix Chat"
        U["👤 User"]
        R["💬 Matrix Room"]
    end

    subgraph "go-matrix-bot"
        B["🤖 Bot Engine"]
        H["📨 Message Handlers"]
        MD["📝 Markdown → HTML"]
        E2E["🔒 E2E Encryption"]
    end

    subgraph "Integrations"
        AI["🧠 go-ollama<br/>LLM / AI"]
        GIT["📦 go-gitea-helpers<br/>Git Repos & Issues"]
        OO["📋 go-onlyoffice<br/>Projects & Tasks"]
    end

    subgraph "AI Infrastructure"
        OL["Ollama Server<br/>CUDA / SYCL / CPU"]
    end

    U -->|"sends message"| R
    R -->|"event"| B
    B --> H
    H -->|"query"| AI
    H -->|"fetch/create"| GIT
    H -->|"fetch/create"| OO
    AI -->|"POST /api/generate"| OL
    OL -->|"streaming tokens"| AI
    AI -->|"AI response"| H
    GIT -->|"repos, issues"| H
    OO -->|"projects, tasks"| H
    H -->|"formatted reply"| MD
    MD --> E2E
    E2E -->|"encrypted message"| R
    R -->|"displays"| U
```

## Integration patterns

### Echo / utility bot

```mermaid
sequenceDiagram
    participant User
    participant Matrix
    participant Bot

    User->>Matrix: !ping
    Matrix->>Bot: event
    Bot->>Matrix: "pong!"
    Matrix->>User: pong!
```

### AI assistant (Ollama)

```mermaid
sequenceDiagram
    participant User
    participant Matrix
    participant Bot
    participant Ollama

    User->>Matrix: ::explain Go channels
    Matrix->>Bot: event
    Bot->>Ollama: POST /api/generate
    Ollama-->>Bot: streaming tokens...
    Bot->>Bot: join tokens → markdown → HTML
    Bot->>Matrix: formatted reply @User
    Matrix->>User: rich AI response
```

### Gitea issue tracker

```mermaid
sequenceDiagram
    participant User
    participant Matrix
    participant Bot
    participant Gitea

    User->>Matrix: !issues backend-api
    Matrix->>Bot: event
    Bot->>Gitea: GET /repos/{owner}/backend-api/issues (paginated)
    Gitea-->>Bot: issues list
    Bot->>Bot: format as markdown table
    Bot->>Matrix: issue list @User
    Matrix->>User: formatted issue list
```

## Where it ships

- [go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) — Matrix RAG bot (`!brain` prefix)
- [Edelweiss video assistant MVP](/posts/edelweiss-video-assistant-mvp/) — healthcare knowledge bot in Element
- [Go libraries toolkit](/posts/go-libraries-toolkit/) — composable module cluster

## Tech stack

Go · mautrix-go · E2E encryption · Ollama · Gitea API · OnlyOffice API
