---
title: Slidev + Markdown Demo
description: Beispiel mit horizontalen Slides, Notes und Code
theme: default
tags: demo, slidev, markdown
---

# Willkommen

Diese Präsentation wird direkt aus `/content` geladen.

---

# Agenda

- Markdown als Source of Truth
- Slidev Rendering
- PDF Export über den Exportknopf

---

## Unterfolie

Diese Folie folgt direkt nach der Agenda.

<!--
Nur in den Speaker Notes sichtbar.
-->

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

Theme in der Frontmatter oder per URL-Parameter ändern:

`/slides/beispiel-praesentation/`
