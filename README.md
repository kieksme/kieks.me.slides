# kieks.me.slides

Statische Website für Markdown-basierte Präsentationen mit **Vite + Vue 3 + reveal.js**.

## Warum dieser Stack?

| Tool | Bewertung | Kommentar |
|---|---|---|
| reveal.js | sehr gut | Sehr flexibel, Notes, Print/PDF, Themes |
| Slidev | sehr gut | Sehr gute DX, aber opinionated Framework |
| Marp | gut | Sehr simpel, weniger interaktiv |
| mdx-deck | mittel | Stark React-zentriert |

**Entscheidung:** `Vite + reveal.js` (statisch, leichtgewichtig, volle Kontrolle).
Vue 3 wurde als App-Shell hinzugefügt und ermöglicht reaktive Komponenten, Pinia-State und `@unhead/vue`-Meta-Tag-Management – ohne Slidev als Framework aufzuzwingen.

## Projektstruktur

```text
content/                            # Markdown-Quellen für Präsentationen
src/
  main.js                           # Vue-App-Einstiegspunkt (createApp + applyAppSetup)
  App.vue                           # Root-Komponente mit pfadbasiertem Routing
  setup/
    main.ts                         # config-vue: globale Komponenten, Pinia, Head, Provide, isDark
  components/
    AppLanding.vue                  # Landing-Page (Suche, Karten-Grid)
    AppSlides.vue                   # Reveal.js-Slide-Viewer mit Topbar
    AppNotFound.vue                 # 404-Seite
    PresentationCard.vue            # Einzelne Präsentationskarte
    Callout.vue                     # Global registrierte Hinweisbox (info/tip/warning/danger)
  composables/
    usePresentations.ts             # Lädt und parst alle Präsentationen aus /content
    useDark.ts                      # Reaktiver isDark-Ref (spiegelt Systemeinstellung)
  stores/
    app.ts                          # Pinia-Store (searchQuery bleibt beim Zurücknavigieren)
  style.css                         # Globale Brand-Styles
vite.config.js                      # Vue-Plugin
netlify.toml                        # Netlify Build + SPA Redirects
.github/workflows/ci.yml            # CI Build bei Push/PR
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
- Suchfeld auf der Landing Page mit persistenter Query (Pinia-Store)
- Vue 3 App-Shell mit config-vue-Pattern (`src/setup/main.ts`):
  - Globale `<Callout>`-Komponente (info / tip / warning / danger)
  - Pinia-State (searchQuery bleibt beim Zurücknavigieren erhalten)
  - `@unhead/vue` für reaktive `<title>`-Tags pro Seite
  - `provide('siteConfig', …)` für siteweite Konfigurationswerte
  - `isDark`-Watcher (OS-Präferenz → `<html data-theme="dark|light">`)

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
