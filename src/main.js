import './style.css';
import 'reveal.js/reveal.css';
import 'reveal.js/plugin/highlight/monokai.css';

import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown';
import RevealHighlight from 'reveal.js/plugin/highlight';
import RevealNotes from 'reveal.js/plugin/notes';

const themeLoaders = {
  black: () => import('reveal.js/theme/black.css'),
  white: () => import('reveal.js/theme/white.css'),
  league: () => import('reveal.js/theme/league.css'),
  sky: () => import('reveal.js/theme/sky.css'),
  beige: () => import('reveal.js/theme/beige.css'),
  simple: () => import('reveal.js/theme/simple.css'),
  solarized: () => import('reveal.js/theme/solarized.css'),
  night: () => import('reveal.js/theme/night.css'),
  moon: () => import('reveal.js/theme/moon.css'),
};

const rawPresentations = import.meta.glob('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const presentations = Object.entries(rawPresentations)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()?.replace(/\.md$/i, '') ?? '';
    const parsed = parseFrontmatter(raw);
    const title = parsed.meta.title || extractTitle(parsed.content) || slug;

    return {
      slug,
      title,
      description: parsed.meta.description || '',
      tags: parseTags(parsed.meta.tags),
      theme: parsed.meta.theme || 'black',
      content: parsed.content,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'de'));

const app = document.querySelector('#app');
const path = normalizePath(window.location.pathname);

if (path === '/') {
  renderLanding();
} else if (path.startsWith('/slides/')) {
  const slug = decodeURIComponent(path.replace('/slides/', ''));
  renderSlides(slug);
} else {
  renderNotFound();
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return { meta: {}, content: markdown };
  }

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator <= 0) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    if (key) {
      meta[key] = value;
    }
  }

  return {
    meta,
    content: markdown.slice(match[0].length),
  };
}

function parseTags(tags) {
  if (!tags) {
    return [];
  }

  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function extractTitle(markdown) {
  const headingMatch = markdown.match(/^#\s+(.+)$/m);
  return headingMatch ? headingMatch[1].trim() : '';
}

function renderLanding() {
  const options = presentations
    .map((entry) => `<option value="${escapeHtml(entry.title)}"></option>`)
    .join('');

  app.innerHTML = `
    <main class="layout">
      <header class="hero">
        <p class="kicker">slides.kieks.me</p>
        <h1>Markdown Präsentationen</h1>
        <p class="lead">Automatisch aus <code>/content</code> geladen. Reveal.js unterstützt horizontale/vertikale Slides, Notes, Themes und PDF-Export.</p>
      </header>

      <label class="search" for="search-input">
        <span>Suche</span>
        <input id="search-input" list="presentation-titles" type="search" placeholder="Präsentation oder Tag" />
      </label>
      <datalist id="presentation-titles">${options}</datalist>

      <ul id="presentation-list" class="grid">
        ${presentations.map(renderCard).join('')}
      </ul>
    </main>
  `;

  const searchInput = document.querySelector('#search-input');
  const list = document.querySelector('#presentation-list');

  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = presentations.filter((entry) => {
      const haystack = `${entry.title} ${entry.description} ${entry.tags.join(' ')}`.toLowerCase();
      return haystack.includes(query);
    });

    list.innerHTML = filtered.map(renderCard).join('');

    if (filtered.length === 0) {
      list.innerHTML = '<li class="empty">Keine Präsentation gefunden.</li>';
    }
  });
}

function renderCard(entry) {
  const tags = entry.tags
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join('');

  return `
    <li class="card">
      <article>
        <h2>${escapeHtml(entry.title)}</h2>
        ${entry.description ? `<p>${escapeHtml(entry.description)}</p>` : ''}
        ${tags ? `<p class="tags">${tags}</p>` : ''}
        <div class="actions">
          <a class="button" href="/slides/${encodeURIComponent(entry.slug)}">Starten</a>
          <a class="button secondary" href="/slides/${encodeURIComponent(entry.slug)}?print-pdf" target="_blank" rel="noreferrer">PDF/Print</a>
        </div>
      </article>
    </li>
  `;
}

async function renderSlides(slug) {
  const presentation = presentations.find((entry) => entry.slug === slug);

  if (!presentation) {
    renderNotFound();
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const selectedTheme = params.get('theme') || presentation.theme || 'black';
  const normalizedTheme = themeLoaders[selectedTheme] ? selectedTheme : 'black';
  const printMode = params.has('print-pdf');

  await themeLoaders[normalizedTheme]();

  app.innerHTML = `
    <div class="topbar${printMode ? ' hidden-for-print' : ''}">
      <a href="/" class="button secondary">← Übersicht</a>
      <div class="topbar-meta">
        <span>${escapeHtml(presentation.title)}</span>
        <a href="/slides/${encodeURIComponent(slug)}?print-pdf&theme=${encodeURIComponent(normalizedTheme)}" class="button secondary" target="_blank" rel="noreferrer">PDF/Print</a>
      </div>
    </div>

    <div class="reveal">
      <div class="slides">
        <section
          data-markdown
          data-separator="^\\r?\\n---\\r?\\n$"
          data-separator-vertical="^\\r?\\n--\\r?\\n$"
          data-separator-notes="^Note:"
        >
          <textarea data-template>${escapeForTextarea(presentation.content)}</textarea>
        </section>
      </div>
    </div>
  `;

  const deck = new Reveal(document.querySelector('.reveal'), {
    hash: true,
    controls: true,
    progress: true,
    center: true,
    slideNumber: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
  });

  await deck.initialize();
}

function escapeForTextarea(value) {
  return value.replace(/<\/textarea/gi, '<\\/textarea');
}

function renderNotFound() {
  app.innerHTML = `
    <main class="layout not-found">
      <h1>Präsentation nicht gefunden</h1>
      <p>Bitte prüfe den Namen in der URL oder gehe zurück zur Übersicht.</p>
      <a class="button" href="/">Zur Übersicht</a>
    </main>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
