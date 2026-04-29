# kieks.me.slides

Statische Website für Markdown-basierte Präsentationen mit **Vite + Vue 3 + Slidev**.

## Stack

| Tool | Bewertung | Kommentar |
|---|---|---|
| Slidev | sehr gut | Sehr gute DX, eigenständige Präsentations-Apps aus Markdown |
| Vite + Vue 3 | sehr gut | Landing-Page als leichtgewichtige App-Shell |

**Architektur:** Die Landing-Page (Suchfeld, Karten-Grid) ist eine eigenständige Vite+Vue-App.
Jede Präsentation in `/content` wird durch Slidev als vollständige statische App nach `dist/slides/<slug>/` gebaut.

## Projektstruktur

```text
content/                            # Markdown-Quellen für Präsentationen (Slidev-Format)
scripts/
  build-slides.mjs                  # Baut alle /content/*.md mit Slidev nach dist/slides/
  migrate-content.mjs               # Einmalig: migriert Reveal.js-Markdown zu Slidev-Format
src/
  main.js                           # Vue-App-Einstiegspunkt (createApp + applyAppSetup)
  App.vue                           # Root-Komponente (rendert immer AppLanding)
  setup/
    main.ts                         # config-vue: globale Komponenten, Pinia, Head, Provide, isDark
  components/
    AppLanding.vue                  # Landing-Page (Suche, Karten-Grid)
    PresentationCard.vue            # Einzelne Präsentationskarte
    Callout.vue                     # Global registrierte Hinweisbox (info/tip/warning/danger)
  composables/
    usePresentations.ts             # Lädt und parst alle Präsentationen aus /content
    useDark.ts                      # Reaktiver isDark-Ref (spiegelt Systemeinstellung)
  stores/
    app.ts                          # Pinia-Store (searchQuery bleibt beim Zurücknavigieren)
  style.css                         # Globale Brand-Styles
vite.config.js                      # Vue-Plugin für Landing-Page
netlify.toml                        # Netlify Build + SPA/Static Redirects
.github/workflows/ci.yml            # CI Build bei Push/PR
```

## Features

- Automatische Präsentationsliste aus `/content/*.md`
- Routing:
  - `/` Übersicht (Landing-Page)
  - `/slides/<name>/` Präsentation (Slidev-App)
- Slidev mit:
  - horizontalen Slides (`---`)
  - Code-Highlighting
  - Speaker Notes (`<!-- ... -->`)
  - PDF-Export über Slidev's eingebautem Export-Button
- Suchfeld auf der Landing Page mit persistenter Query (Pinia-Store)
- Vue 3 App-Shell mit config-vue-Pattern (`src/setup/main.ts`):
  - Globale `<Callout>`-Komponente (info / tip / warning / danger)
  - Pinia-State (searchQuery bleibt beim Zurücknavigieren erhalten)
  - `@unhead/vue` für reaktive `<title>`-Tags pro Seite
  - `provide('siteConfig', …)` für siteweite Konfigurationswerte
  - `isDark`-Watcher (OS-Präferenz → `<html data-theme="dark|light">`)

## Markdown-Format

Dateien liegen in `/content` und nutzen Slidev-Frontmatter:

```md
---
title: Mein Vortrag
description: Kurzbeschreibung
theme: default
tags: tag1, tag2
---

# Folie 1

---

# Folie 2

---

## Weitere Folie

<!-- Speaker Note: Nur in den Notes sichtbar. -->
```

**Hinweise:**
- Slide-Trenner: `---` (horizontal, alle auf gleicher Ebene)
- Vertikale Slides (`--` in Reveal.js) gibt es in Slidev nicht – einfach `---` verwenden
- Speaker Notes: HTML-Kommentar `<!-- ... -->` direkt unterhalb der Folie

## Lokaler Start

Landing-Page:

```bash
npm install
npm run dev
```

Einzelne Präsentation mit Slidev:

```bash
npm run dev:slides
# oder für eine bestimmte Präsentation:
./node_modules/.bin/slidev content/<name>.md
```

Build:

```bash
npm run build        # baut Slides + Landing-Page
npm run build:slides # nur Slidev-Präsentationen
npm run build:landing# nur Landing-Page
npm run preview
```

## Deployment (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Domain: `slides.kieks.me`
- `netlify.toml` enthält separate Redirect-Regeln für `/slides/*` (statisch) und `/*` (SPA).

## CI/CD

GitHub Actions Workflow (`.github/workflows/ci.yml`) baut das Projekt bei Push/PR automatisch.
