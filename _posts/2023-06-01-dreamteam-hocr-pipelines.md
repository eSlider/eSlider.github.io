---
title: "Dreamteam — hOCR Product & Document Pipelines"
date: 2023-06-01 10:00:00 +0000
categories: [Companies, Clients, Data Engineering]
tags: [Go, PHP, OCR, Docker, Healthcare, Dreamteam, Clients]
description: "My hOCR product delivered for Dreamteam — pipelines/devops, Content Serve, Storyflash, TrafficDesk, DPO."
---

**Dreamteam** · 2022–2023  
**Role**: Client engagement via **ProProdukt SL** — **hOCR** is my product; Dreamteam was the delivery context (pipelines / devops), not a separate employer.

## Summary

~200+ author commits on document/OCR and related client products. Public library **[go-hocr](https://github.com/eSlider/go-hocr)**; engagement story on this site under Dreamteam; product leaf also tracked with Content Serve in the internal OnlyOffice graph.

## Key repositories

| Repository | Commits | Focus |
|------------|--------:|-------|
| content-serve / hocr | ~96 | HOCR content server (client product) |
| hocr / pipelines | ~72 | HOCR pipeline + devops |
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

Public library: [github.com/eSlider/go-hocr](https://github.com/eSlider/go-hocr) — hOCR 1.2 parser with YAML/HTML export (Jun 2026). See [go-hocr post](/posts/go-hocr-tesseract-parser/).
