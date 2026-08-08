---
title: "Workspace Catalog — Path↔Org↔OnlyOffice Index"
date: 2026-08-08 06:30:00 +0000
categories: [DevOps, Software Architectures, Projects]
tags: [OnlyOffice, Gitea, Inventar, Governance, Documentation, ProProdukt]
description: "How laptop/8TB project trees map to orgs and OnlyOffice projects — business SSOT vs code SSOT, without publishing private CRM."
---

**Platform ops** · ProProdukt SL · 2026  
**Related**: [Inventar governance](/posts/inventar-docs-governance/) · [go-onlyoffice / `oo` CLI](/posts/go-onlyoffice-oo-cli/) · [produktor platform](/posts/produktor-platform-self-hosted-stack/)

After consolidating years of clones onto a single `/mnt/8TB/projects` tree, the missing piece was not another README — it was a **machine-readable index** of what lives where, for whom, and which OnlyOffice project owns the business record.

## Sources of truth (split on purpose)

| Layer | Authority | What stays public |
|-------|-----------|-------------------|
| Business (CRM, deals, hubs) | OnlyOffice | Engagement stories on this site — not contact dumps |
| Code | Gitea (`git.produktor.io`) / selective GitHub | Repos and write-ups you see here |
| Unstructured + associations | second-brain (Neo4j / Qdrant / MD) | Architecture posts, not private rooms |
| Path inventory | `workspace-catalog.yaml` (private CV tooling) | The *pattern*, not the file |

Inventar ASR/ADR defines the split; this catalog is the **filesystem ↔ org ↔ OO** bridge for the workstation.

## What the catalog carries

Per git root (simplified):

- `path`, `remote`, `branch`, `head`
- `org_id` / `org_label` / career `period` / `role`
- `zone` (hot vs cold / archive)
- `oo_company_id` / `oo_project_id` (leaf when title matches; else employer hub)

Generators regenerate the YAML and fuzzy-link paths to existing OnlyOffice leaf projects so we do **not** create hundreds of empty OO projects.

## Why it matters publicly

Recruiters and collaborators already see clients and products on [Clients](/clients/) and [Projects](/projects/). Internally, the same graph powers:

- consistent hub projects per employer / own company
- safe home→8TB moves (stubs + live Docker mount freeze)
- mesh seed updates that feed [produktor.io](https://produktor.io) and this blog

Private employer hub IDs and CRM inventories stay off this site on purpose.

## Related

[Inventar & Docs](/posts/inventar-docs-governance/) · [go-onlyoffice](/posts/go-onlyoffice-oo-cli/) · [MomSwap](/posts/momswap-geojson-ed25519/) · [Swarm House](/posts/swarm-house-drone-data-platform/)
