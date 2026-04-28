---
title: Reveal.js + Markdown Demo
description: Beispiel mit Fragments, Backgrounds, Layout, Tabellen und mehr
theme: black
tags: demo, revealjs, markdown
---

# Willkommen

Diese Präsentation wird direkt aus `/content` geladen.

Note:
Willkommen! Dies sind Speaker Notes — nur im Presenter-Modus sichtbar (Taste **S**).

---

# Agenda

- Markdown als Source of Truth
- Horizontale & vertikale Slides
- Code-Highlighting
- Fragments & Animationen
- Layouts & Tabellen
- Themes & PDF-Export

--

## Vertikale Unterfolie

Diese Folie ist **vertikal** unter der Agenda angeordnet (Taste ↓).

Note:
Vertikale Folien gruppieren zusammengehörige Inhalte ohne den Hauptfluss zu unterbrechen.

--

## Noch eine vertikale Folie

Mit `--` können beliebig viele vertikale Ebenen erzeugt werden.

---

# Code Highlighting

```js
function hello(name) {
  return `Hallo, ${name}!`;
}

console.log(hello('Kieks'));
```

Note:
Code wird mit highlight.js eingefärbt. Das Monokai-Theme ist aktiv.

---

<!-- .slide: data-background-color="#1a3a5c" -->

# Hintergrundfarbe

Diese Folie hat einen **benutzerdefinierten Hintergrund** via `data-background-color`.

---

# Fragments

Inhalte können **schrittweise eingeblendet** werden:

- Erster Punkt <!-- .element: class="fragment" -->
- Zweiter Punkt <!-- .element: class="fragment" -->
- Dritter Punkt <!-- .element: class="fragment fade-up" -->

Note:
Fragments werden mit der Leertaste oder Pfeiltaste vorwärts eingeblendet.

---

# Zwei-Spalten-Layout

<div class="r-hstack" style="gap: 2rem; align-items: flex-start">

<div>

**Links**

- Punkt A
- Punkt B
- Punkt C

</div>

<div>

**Rechts**

```python
def greet(name):
    return f"Hallo {name}"
```

</div>

</div>

---

# Tabelle

| Feature | Unterstützt | Hinweis |
|---|:---:|---|
| Horizontale Slides | ✅ | Trenner `---` |
| Vertikale Slides | ✅ | Trenner `--` |
| Speaker Notes | ✅ | `Note:` am Folienbeginn |
| Fragments | ✅ | `<!-- .element: class="fragment" -->` |
| Themes | ✅ | Frontmatter oder `?theme=...` |
| PDF-Export | ✅ | `?print-pdf` |

---

# Theme wechseln

Theme per Query-Parameter ändern:

`/slides/beispiel-praesentation?theme=solarized`

Verfügbare Themes: `black` · `white` · `league` · `sky` · `beige` · `simple` · `solarized` · `night` · `moon`

---

# Tastenkürzel

| Taste | Aktion |
|---|---|
| `→` / `Space` | Nächste Folie |
| `↓` | Vertikale Folie |
| `S` | Speaker Notes |
| `F` | Vollbild |
| `O` | Übersicht |
| `B` | Bildschirm schwärzen |
| `?` | Alle Shortcuts |
