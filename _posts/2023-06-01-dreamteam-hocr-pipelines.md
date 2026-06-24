---
title: "Dreamteam — HOCR & Document Processing Pipelines"
date: 2023-06-01 10:00:00 +0000
categories: [Companies, Data Engineering]
tags: [Go, PHP, OCR, Docker, Healthcare]
description: "~200+ commits on HOCR content server, PDF generation, traffic analytics — client via produktor.io."
---

**Dreamteam** · 2022–2023  
**Role**: Client work delivered via **ProProdukt SL / produktor.io** (not a separate employer)

## Summary

~200+ author commits on document/OCR and traffic-analytics tooling — precursor to **[go-hocr](https://github.com/eSlider/go-hocr)** and AI document workflows.

## Key repositories

| Repository | Commits | Focus |
|------------|--------:|-------|
| content-serve-hocr | ~96 | HOCR content server |
| hocr | ~72 | HOCR pipeline |
| dpo | ~75 | Data protection tooling |
| storyflash | ~36 | Storyflash product |
| trafficdesk | ~25 | Traffic analytics |

## Architecture

- Go services serve HOCR (HTML OCR) content from Tesseract output
- PDF generation and expert-report tooling
- Docker Compose stacks for content server and address-parsing sidecars

## Tech stack

Go · PHP · HOCR/OCR · PDF · Docker Compose

## Follow-on

Public library: [github.com/eSlider/go-hocr](https://github.com/eSlider/go-hocr) — hOCR 1.2 parser with YAML/HTML export.
