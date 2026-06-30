---
title: "Edelweiss — Video Assistant MVP (Matrix + GraphRAG)"
date: 2026-06-25 12:00:00 +0000
categories: [Projects, Software Architectures]
tags: [Healthcare, Matrix, WebRTC, Neo4j, Qdrant, RAG, Ollama, STT, TTS]
description: "MVP: Element assistant bot — voice/text → STT → GraphRAG → Ollama humanize → TTS, with feedback into Qdrant and Neo4j."
mermaid: true
---

**Edelweiss** video assistant · MVP design · 2026-06

Matrix-native **knowledge assistant** for healthcare users in **Element**: converse by text, voice message, or call; answers grounded in **Edelweiss** Markdown → **Neo4j** + **Qdrant**, humanized by local **Ollama** (Gemma / Bonsai).

## Builds on

- **Matrix / WebRTC stack** — Synapse, coturn, LiveKit (architecture below)
- [go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) — GraphRAG bot SDK
- [Edelweiss healthcare stack](/posts/edelweiss-healthcare-knowledge-base/) — pflege homeservers

## MVP flow

1. User speaks or types in Element room with bot
2. **STT** (Faster-Whisper / Vosk) for audio
3. **GraphRAG** — Qdrant semantic chunks + Neo4j associations
4. **Ollama** — generate + humanize (Gemma / Bonsai)
5. Reply as text + optional **TTS** (Piper / Coqui)
6. Positive **feedback** → store refined context in Qdrant + Neo4j

Voice uses a dedicated bot media path; the room timeline stays the audit trail and text fallback.

Source: [`video-assistant-architecture.mmd`](https://github.com/eSlider/cv/blob/main/projects/edelweiss/video-assistant-architecture.mmd) in cv repo.

```mermaid
flowchart TB
  subgraph Client["Element Client"]
    User["User text voice call"]
    Element["Element interface"]
    User -->|text or audio| Element
  end

  subgraph Matrix["Matrix Homeserver"]
    Synapse["Synapse server"]
    Coturn["coturn TURN STUN"]
    LiveKit["LiveKit SFU MatrixRTC"]
    Element -->|signaling and events| Synapse
    Element -->|WebRTC media| Coturn
    Element -->|Element Call| LiveKit
  end

  Bot["Knowledge bot service"]

  Synapse -->|bot events| Bot
  LiveKit -->|audio stream| Bot

  subgraph VoiceMVP["MVP voice pipeline"]
    STT["STT Faster-Whisper or Vosk"]
    TTS["TTS Piper or Coqui"]
    Bot -->|audio stream| STT
    STT -->|transcript text| Bot
    Bot -->|answer text| TTS
    TTS -->|audio reply| Bot
  end

  subgraph VoiceV2["v2 Wan Streamer when available"]
    Wan["Wan Streamer duplex AV about 500ms"]
    Bot -.->|future swap| Wan
    Wan -.->|sync audio video| Bot
  end

  subgraph GraphRAG["GraphRAG layer"]
    Qdrant["Qdrant semantic vectors"]
    Neo4j["Neo4j association graph"]
    Ingestor["Ingestor Markdown to graph"]
    Bot -->|semantic search| Qdrant
    Bot -->|graph traversal| Neo4j
    Qdrant -->|retrieved context| Bot
    Neo4j -->|retrieved context| Bot
  end

  subgraph AI["AI inference"]
    LLM["Ollama Gemma Bonsai humanize"]
    Bot -->|prompt plus context| LLM
    LLM -->|generated response| Bot
  end

  subgraph Persistence["Persistence"]
    KB["Knowledge base Markdown files"]
    FB["Feedback store"]
    KB -->|ingest| Ingestor
    Ingestor -->|chunks and entities| Qdrant
    Ingestor -->|nodes and edges| Neo4j
    Bot --> FB
    FB -->|update| Qdrant
    FB -->|update| Neo4j
  end

  Bot -->|text reply| Synapse
  Bot -->|voice message| Synapse
  Synapse --> Element
  Element -->|reaction feedback| Bot
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

| Phase | Deliverable |
|-------|-------------|
| 1 | Text `!brain` RAG (shipped in go-second-brain) |
| 2 | Voice message STT → RAG → TTS |
| 3 | Element Call / LiveKit bot join |
| 4 | Reaction feedback → graph + vector store |
| 5 | [Wan Streamer](https://wan-streamer.com/) — end-to-end duplex voice/video when available (~500 ms vs modular STT+RAG+TTS) |

## Next version — Wan Streamer

MVP uses a **modular** voice path (STT → GraphRAG → Ollama → TTS). The **next version** adapts **[Wan Streamer](https://wan-streamer.com/)** as soon as it is available for integration: one end-to-end streaming Transformer for real-time, full-duplex audio-visual interaction (~**200 ms** model-side, ~**500–550 ms** total per their v0.1 figures — much faster than chained ASR/LLM/TTS).

GraphRAG (Qdrant + Neo4j) remains the **knowledge layer**; Wan Streamer becomes the **interaction layer** (voice reply, optional synchronized video agent).

**Portfolio detail**: [github.com/eSlider/cv — video-assistant-mvp](https://github.com/eSlider/cv/blob/main/projects/edelweiss/video-assistant-mvp.md)

## Related

[go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) · [Edelweiss healthcare](/posts/edelweiss-healthcare-knowledge-base/) · [Bonsai Ollama proxy](/posts/bonsai-ollama-q1-proxy/)
