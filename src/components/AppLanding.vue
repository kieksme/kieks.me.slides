<script setup>
import { computed, inject } from 'vue'
import { useHead } from '@unhead/vue'
import { useAppStore } from '../stores/app'
import { presentations } from '../composables/usePresentations'
import PresentationCard from './PresentationCard.vue'

const store = useAppStore()
const siteConfig = inject('siteConfig')

useHead({ title: () => siteConfig?.name ?? 'slides.kieks.me' })

const titleOptions = presentations.map((p) => p.title)

const filtered = computed(() => {
  const q = store.searchQuery.trim().toLowerCase()
  if (!q) return presentations
  return presentations.filter(({ title, description, tags }) =>
    `${title} ${description} ${tags.join(' ')}`.toLowerCase().includes(q),
  )
})
</script>

<template>
  <main class="layout">
    <header class="hero">
      <p class="kicker">{{ siteConfig?.name }}</p>
      <h1>Markdown Präsentationen</h1>
      <p class="lead">
        Automatisch aus <code>/content</code> geladen. Reveal.js unterstützt
        horizontale/vertikale Slides, Notes, Themes und PDF-Export.
      </p>
      <Callout type="tip" title="Theme wechseln">
        Query-Parameter <code>?theme=solarized</code> (oder in der Frontmatter) zum Ändern
        des Themes nutzen.
      </Callout>
    </header>

    <label class="search" for="search-input">
      <span>Suche</span>
      <input
        id="search-input"
        v-model="store.searchQuery"
        list="presentation-titles"
        type="search"
        placeholder="Präsentation oder Tag"
      />
    </label>
    <datalist id="presentation-titles">
      <option v-for="title in titleOptions" :key="title" :value="title" />
    </datalist>

    <ul class="grid">
      <PresentationCard
        v-for="p in filtered"
        :key="p.slug"
        :slug="p.slug"
        :title="p.title"
        :description="p.description"
        :tags="p.tags"
      />
      <li v-if="filtered.length === 0" class="empty">Keine Präsentation gefunden.</li>
    </ul>
  </main>
</template>
