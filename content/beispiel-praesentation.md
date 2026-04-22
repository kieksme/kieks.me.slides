---
title: Reveal.js + Markdown Demo
description: Beispiel mit horizontalen/vertikalen Slides, Notes und Code
theme: black
tags: demo, revealjs, markdown
---

# Willkommen

Diese Präsentation wird direkt aus `/content` geladen.

---

# Agenda

- Markdown als Source of Truth
- Reveal.js Rendering
- PDF Export via `?print-pdf`

--

## Vertikale Unterfolie

Diese Folie ist vertikal unter der Agenda angeordnet.

Note:
Nur in den Speaker Notes sichtbar.

---

# Code Highlighting

```js
function hello(name) {
  return `Hallo ${name}`;
}

console.log(hello('Kieks'));
```

---

# Theme wechseln

Theme per Query-Parameter ändern:

`/slides/beispiel-praesentation?theme=solarized`
