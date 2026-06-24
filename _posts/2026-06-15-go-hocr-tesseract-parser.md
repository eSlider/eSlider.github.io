---
title: "go-hocr — hOCR 1.2 Parser for Tesseract"
date: 2026-06-15 10:00:00 +0000
categories: [Projects, Programming]
tags: [Go, OCR, Docker]
description: "Parse Tesseract hOCR 1.2 output — YAML/HTML export, bounding boxes, OCR confidence."
---

**go-hocr** is a Go library for parsing **hOCR 1.2** files from Tesseract — with YAML/HTML export, bounding boxes, and per-word OCR confidence.

**Repository**: [github.com/eSlider/go-hocr](https://github.com/eSlider/go-hocr) · last push **2026-06-15**

## Why hOCR

Tesseract outputs structured OCR as hOCR (HTML + microformat classes). Downstream pipelines need typed Go structs — not fragile regex over HTML. go-hocr provides a stable parser for document workflows.

## Features

- Parse hOCR 1.2 pages, paragraphs, lines, and words
- Export to YAML or HTML for inspection and tooling
- Bounding box coordinates and confidence scores per token
- Foundation for content servers and PDF pipelines

## Lineage

Evolved from **Dreamteam** client work (2022–2023) on HOCR content servers (~200+ commits on `hocr` and `content-serve-hocr`). Public library extracted for reuse in [go-second-brain](/posts/go-second-brain-knowledge-graph-rag/) document ingest and future OCR stacks.

## Related

- [Dreamteam HOCR pipelines](/posts/dreamteam-hocr-pipelines/) — client engagement
- [mail-archive](/posts/mail-archive-imap-search/) — archival search stack

## Tech stack

Go · Tesseract hOCR · YAML · HTML
