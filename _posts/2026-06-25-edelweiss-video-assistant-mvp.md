---
title: "Edelweiss — Video Assistant MVP (Matrix + GraphRAG)"
date: 2026-06-25 12:00:00 +0000
last_modified_at: 2026-06-30 14:00:00 +0000
categories: [Projects, Software Architectures]
tags: [Healthcare, Matrix, WebRTC, Neo4j, Qdrant, RAG, Ollama, STT, TTS]
description: "MVP: Element assistant bot — voice/text → STT → GraphRAG → Ollama humanize → TTS, with feedback into Qdrant and Neo4j."
pin: true
mermaid: true
---

**Edelweiss** video assistant · MVP design · 2026-06

Matrix-native **knowledge assistant** for healthcare users in **Element**: converse by text, voice message, or call; answers grounded in **Edelweiss** Markdown → **Neo4j** + **Qdrant**, humanized by local **Ollama** (Gemma / Bonsai).

## Builds on

- **Matrix / WebRTC stack** — Synapse, coturn, LiveKit (architecture below)
- [go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) — GraphRAG bot SDK
- [Edelweiss healthcare stack](/posts/edelweiss-healthcare-knowledge-base/) — pflege homeservers · [federation](/posts/edelweiss-healthcare-knowledge-base/#what-federated-matrix-chat-means)

## MVP flow

1. User speaks or types in Element room with bot
2. **STT** (Faster-Whisper / Vosk) for audio
3. **GraphRAG** — Qdrant semantic chunks + Neo4j associations
4. **Ollama** — generate + humanize (Gemma / Bonsai)
5. Reply as text + optional **TTS** (Piper / Coqui)
6. Positive **feedback** → store refined context in Qdrant + Neo4j

Voice uses a dedicated bot media path; the room timeline stays the audit trail and text fallback.

**On this page**: [v1 architecture](#architecture-v1--modular-pipeline) · [MVP v2](#architecture-mvp-v2--wan-streamer-lane) · [one voice turn](#one-voice-turn) · [Wan Streamer roadmap](#next-version--wan-streamer)

## Architecture v1 — modular pipeline

Original modular design: bot inside Matrix homeserver, STT → GraphRAG → Ollama → TTS, feedback via ingestor.

```mermaid
flowchart TD
    subgraph Client["Element Client (Web/X)"]
        User[User - Text/Voice/Call]
        Element[Element Interface]
    end

    subgraph Matrix["Matrix Homeserver"]
        Synapse[Synapse Server]
        Coturn[coturn TURN/STUN]
        LiveKit[LiveKit SFU - MatrixRTC]
        Bot[Knowledge Bot Service]
    end

    subgraph Voice["Voice Pipeline"]
        STT[STT: Faster-Whisper / Vosk]
        TTS[TTS: Piper / Coqui]
    end

    subgraph RAG["GraphRAG Layer"]
        Qdrant[Qdrant - Semantic Vectors]
        Neo4j[Neo4j - Association Graph]
        Ingest[Ingestor: Markdown → Graph + Embeddings]
    end

    subgraph AI["AI Inference"]
        LLM[Local LLM: Gemma / Bonsai / Ollama - Humanize + Generate]
    end

    subgraph Storage["Persistence"]
        KB[Knowledge Base: Markdown / Files]
        Feedback[Feedback Store]
    end

    %% Flows
    User -->|Text or Audio| Element
    Element <-->|Signaling & Events| Synapse
    Element <-->|Media Streams Calls| LiveKit
    Synapse <-->|Bot Events| Bot
    LiveKit <-->|Bot joins calls| Bot

    Bot -->|Audio Stream| STT
    STT -->|Transcribed Text| Bot
    Bot -->|Semantic Search| Qdrant
    Bot -->|Graph Traversal| Neo4j
    Qdrant & Neo4j -->|Retrieved Context| Bot
    Bot -->|Full Prompt + Context| LLM
    LLM -->|Generated Response| Bot
    Bot -->|Text Reply| Element
    Bot -->|Audio Reply| TTS
    TTS -->|Voice Message| Element

    KB -->|Ingest| Ingest
    Ingest -->|Chunks & Entities| Qdrant
    Ingest -->|Nodes & Edges| Neo4j

    User -->|Reaction / Feedback| Bot
    Bot -->|Store Refined Data| Feedback
    Feedback -->|Update| Ingest

    style Bot fill:#e1f5fe
    style LLM fill:#f3e5f5
    style LiveKit fill:#e8f5e8
``` 



## Architecture MVP v2 — Wan Streamer lane

```mermaid
flowchart TB
    %% Styling
    classDef client fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef matrix fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef bot fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
    classDef voice fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef rag fill:#e0f2f1,stroke:#00796b,stroke-width:2px
    classDef ai fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef persist fill:#f1f8e9,stroke:#689f38,stroke-width:2px

    subgraph Client["🌐 Element Client (Web / X)"]
        User["👤 User<br>Text / Voice / Call"]
        Element["Element Interface"]
        User -->|📤 Text or Audio| Element
    end

    subgraph Matrix["🏠 Matrix Homeserver"]
        Synapse["Synapse Server"]
        Coturn["coturn<br>TURN / STUN"]
        LiveKit["LiveKit SFU<br>MatrixRTC / Element Call"]
        
        Element <-->|Signaling & Events| Synapse
        Element -->|WebRTC Media 1-1| Coturn
        Element <-->|Group Calls SFU| LiveKit 
    end

    Bot["🤖 Knowledge Bot Service<br>(Matrix Bot)"]:::bot

    %% Matrix <-> Bot
    Synapse <-->|Bot Events / Messages| Bot
    LiveKit <-->|Audio / Call Streams| Bot

    subgraph VoiceMVP["🎙️ MVP Voice Pipeline"]
        STT["STT<br>Faster-Whisper / Vosk"]
        TTS["TTS<br>Piper / Coqui"]
        Bot -->|Send Audio| STT
        STT -->|Transcript Text| Bot
        Bot -->|Answer Text| TTS
        TTS -->|Audio Reply| Bot
    end

    subgraph GraphRAG["🔍 GraphRAG Layer"]
        Qdrant["Qdrant<br>Semantic Vectors"]
        Neo4j["Neo4j<br>Association Graph"]
        Ingestor["Ingestor<br>Markdown → Graph + Embeddings"]
        
        Bot -->|Semantic Search| Qdrant
        Bot -->|Graph Traversal| Neo4j
        Qdrant & Neo4j -->|Retrieved Context| Bot
    end

    subgraph AI["🧠 AI Inference"]
        LLM["Local LLM<br>Ollama + Gemma / Bonsai<br>Humanize & Generate"]
        Bot --->|Prompt + History + Context| LLM
        LLM -->|Humanized Response| Bot
    end

    subgraph Persistence["💾 Persistence"]
        KB["Knowledge Base<br>Markdown Files"]
        FB["Feedback Store"]
        
        KB -->|Ingest| Ingestor
        Ingestor -->|Chunks & Entities| Qdrant
        Ingestor -->|Nodes & Edges| Neo4j
        Bot --->|User Feedback| FB
        FB -->|Update / Store| Qdrant
        FB -->|Update / Store| Neo4j
    end

    %% Final Outputs
    Bot -->|Text Reply| Synapse
    Bot -->|Voice Message| Synapse
    Synapse -->|Deliver to User| Element
    Element -->|Reaction / Feedback| Bot

    class Client client
    class Matrix matrix
    class VoiceMVP voice
    class GraphRAG rag
    class AI ai
    class Persistence persist
```

## One voice turn

```mermaid
sequenceDiagram
  participant U as User Element
  participant S as Synapse
  participant B as Knowledge bot
  participant W as STT
  participant Q as Qdrant
  participant N as Neo4j
  participant L as Ollama
  participant T as TTS

  U->>S: voice message or call audio
  S->>B: Matrix event
  B->>W: audio bytes
  W-->>B: transcript text
  B->>Q: semantic search
  Q-->>B: chunks
  B->>N: graph associations
  N-->>B: entities paths
  B->>L: prompt history retrieval
  L-->>B: humanized answer
  B->>S: text reply
  B->>T: answer text
  T-->>B: audio
  B->>S: voice message optional
  S-->>U: text and or audio
  U->>S: thumbs up reaction
  S->>B: feedback event
  B->>Q: store embedding
  B->>N: store triples
```

## Rollout

| Phase | Deliverable                                                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------------------------- |
| 1     | Text `!brain` RAG (shipped in go-second-brain)                                                                            |
| 2     | Voice message STT → RAG → TTS                                                                                             |
| 3     | Element Call / LiveKit bot join                                                                                           |
| 4     | Reaction feedback → graph + vector store                                                                                  |
| 5     | [Wan Streamer](https://wan-streamer.com/) — end-to-end duplex voice/video when available (~500 ms vs modular STT+RAG+TTS) |

## Next version — Wan Streamer

MVP uses a **modular** voice path (STT → GraphRAG → Ollama → TTS). The **next version** adapts **[Wan Streamer](https://wan-streamer.com/)** as soon as it is available for integration: one end-to-end streaming Transformer for real-time, full-duplex audio-visual interaction (~**200 ms** model-side, ~**500–550 ms** total per their v0.1 figures — much faster than chained ASR/LLM/TTS).

GraphRAG (Qdrant + Neo4j) remains the **knowledge layer**; Wan Streamer becomes the **interaction layer** (voice reply, optional synchronized video agent).

## Related

[go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) · [Edelweiss healthcare](/posts/edelweiss-healthcare-knowledge-base/) · [Bonsai Ollama proxy](/posts/bonsai-ollama-q1-proxy/)
