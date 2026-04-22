# kieks.me.slides

Statische Website für Markdown-basierte Präsentationen mit **Vite + reveal.js**.

## Warum dieser Stack?

| Tool | Bewertung | Kommentar |
|---|---|---|
| reveal.js | sehr gut | Sehr flexibel, Notes, Print/PDF, Themes |
| Slidev | sehr gut | Sehr gute DX, aber opinionated Framework |
| Marp | gut | Sehr simpel, weniger interaktiv |
| mdx-deck | mittel | Stark React-zentriert |

**Entscheidung:** `Vite + reveal.js` (statisch, leichtgewichtig, volle Kontrolle).

## Projektstruktur

```text
content/                    # Markdown-Quellen für Präsentationen
src/main.js                 # Routing, Content-Laden, Reveal-Initialisierung
src/style.css               # Landing + Brand-nahe UI Komponenten
netlify.toml                # Netlify Build + SPA Redirects
.github/workflows/ci.yml    # CI Build bei Push/PR
```

## Features

- Automatische Präsentationsliste aus `/content/*.md`
- Routing:
  - `/` Übersicht
  - `/slides/<name>` Präsentation
- Reveal.js mit:
  - horizontalen Slides (`---`)
  - vertikalen Slides (`--`)
  - Code-Highlighting
  - Speaker Notes (`Note:`)
  - Themes (`theme` in Frontmatter oder `?theme=...`)
- PDF Export über Print-Mode:
  - `/slides/<name>?print-pdf`
  - optionaler Button in Übersicht und Präsentation
- Suchfeld auf der Landing Page (Bonus)

## Markdown-Format

Dateien liegen in `/content` und nutzen optional Frontmatter:

```md
---
title: Mein Vortrag
description: Kurzbeschreibung
theme: solarized
tags: tag1, tag2
---

# Folie 1

---

# Folie 2

--

## Vertikale Folie

Note:
Nur für Speaker Notes.
```

## Lokaler Start

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Deployment (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Domain: `slides.kieks.me`
- Redirects sind in `netlify.toml` für SPA-Routen enthalten.

## CI/CD

GitHub Actions Workflow (`.github/workflows/ci.yml`) baut das Projekt bei Push/PR automatisch.
