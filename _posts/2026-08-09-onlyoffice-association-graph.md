---
title: "OnlyOffice Association Graph — Company ↔ Person ↔ Project"
date: 2026-08-09 08:00:00 +0000
categories: [DevOps, Software Architectures, Projects]
tags: [OnlyOffice, Gitea, Inventar, Governance, Documentation, ProProdukt]
description: "How ProProdukt / Produktor, Dreamteam hOCR, and WhereGroup client vs product lines are modelled in OnlyOffice — Team ≠ Contacts."
---

**Platform ops** · ProProdukt SL · 2026-08  
**Related**: [Workspace catalog](/posts/workspace-catalog-onlyoffice-ssot/) · [go-onlyoffice](/posts/go-onlyoffice-oo-cli/) · [Produktor company](/posts/produktor-io-proprodukt/)

OnlyOffice is the **business SSOT** for companies, people, and engagement projects. After consolidating the workstation catalog, the next pass was cleaning **associations** so titles and CRM contacts match reality.

## Rules that matter in the UI

| UI place | Meaning |
|----------|---------|
| Project **Team** | Portal users (login accounts) |
| Project **Contacts** | CRM companies + persons — the career/business graph |

Looking at Team and wondering where the client went is the usual trap.

## Own company

| CRM | Meaning |
|-----|---------|
| **ProProdukt SL** | Legal entity — I am **Owner** |
| **Produktor.io** | Trade mark / brand of ProProdukt SL |

Hub project titles use `ProProdukt SL | Produktor` so the legal entity and brand stay linked.

## Dreamteam

**hOCR** is my product; Dreamteam was the engagement. Pipelines / devops live under Dreamteam; the Content Serve product leaf stays with the client company. Same story as the [Dreamteam post](/posts/dreamteam-hocr-pipelines/), mirrored in OO.

## WhereGroup

| Kind | Examples |
|------|----------|
| Employer / products | Mapbender hub, Meldemax, mapbender-core, tooling |
| Clients of WhereGroup | EBW Mapbender, Deutsche Bahn FLIMAS, municipal geoportals |

Project titles use `CC \| Company \| Product` with a **unified** employer label (`WhereGroup`, not mixed `WhereGroup GmbH`).

## Tooling

[`oo` CLI](https://github.com/eSlider/go-onlyoffice): `persons update` (JSON PUT — form-encoded person updates ignore `companyId`/`about`), project contacts add/list, company/person dedupe. Library docs: `docs/crm-associations.md` in that repo.

Private CRM IDs stay off this site; the public map is [Clients](/clients/) + engagement posts.
