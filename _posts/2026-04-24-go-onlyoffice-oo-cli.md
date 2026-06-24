---
title: "go-onlyoffice — `oo` CLI for Projects, Calendar & CRM"
date: 2026-04-24 10:00:00 +0000
categories: [Projects, Programming]
tags: [Go, Linux, Microservices]
description: "Go client and CLI for OnlyOffice Project Management API with application-folder CRM sync."
---

Go client library and **`oo` CLI** for the OnlyOffice Project Management API — projects, tasks, milestones, calendar, and CRM (companies, contacts, deals).

**Repository**: [github.com/eSlider/go-onlyoffice](https://github.com/eSlider/go-onlyoffice) · last push **2026-06-24** (Gitea sync, subject-based CLI in v0.5)

## Features

- Project / task / milestone CRUD
- Calendar event management
- CRM entities and opportunity pipeline
- `oo applications sync` — sync structured application folders to OnlyOffice CRM
- Pairs with Gitea issue sync for executive reporting and Gantt views

## Use case

Built to support a structured job-application workflow: each application folder maps to CRM company, recruiter contact, and deal stage — keeping outreach and interview prep in one system alongside project tasks and calendar slots.

## Tech stack

Go · OnlyOffice REST API · Cobra CLI
