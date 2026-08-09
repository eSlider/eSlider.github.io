---
title: "go-onlyoffice — `oo` CLI for Projects, Calendar & CRM"
date: 2026-04-24 10:00:00 +0000
categories: [Projects, Programming]
tags: [Go, Linux, Microservices]
description: "Go client and CLI for OnlyOffice Project Management API with application-folder CRM sync."
---

Go client library and **`oo` CLI** for the OnlyOffice Project Management API — projects, tasks, milestones, calendar, and CRM (companies, contacts, deals).

**Repository**: [github.com/eSlider/go-onlyoffice](https://github.com/eSlider/go-onlyoffice) · active **2026-08** (CRM associations, `oo persons update`, Projects contacts)

## Features

- Project / task / milestone CRUD · Documents folder helpers
- Calendar event management
- CRM: companies, persons (`create` / **`update`**), merge, dedupe, tags
- Project **Contacts** (CRM) vs Team (portal users) — see [association graph](/posts/onlyoffice-association-graph/)
- `oo applications sync` — application folders → CRM
- Pairs with Gitea for executive reporting

## Caveat (person update)

OnlyOffice **ignores** `companyId` / `about` on form-encoded person PUT. The library uses **JSON** PUT and re-fetches so `oo persons update` matches the portal.

## Use case

Job-application folders → CRM company + contact + deal; engagement hubs per employer / own company; client vs product naming on Projects.

## Tech stack

Go · OnlyOffice REST API · Cobra CLI
