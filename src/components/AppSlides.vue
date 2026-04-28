<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import Reveal from 'reveal.js'
import RevealMarkdown from 'reveal.js/plugin/markdown'
import RevealHighlight from 'reveal.js/plugin/highlight'
import RevealNotes from 'reveal.js/plugin/notes'
import 'reveal.js/reveal.css'
import 'reveal.js/plugin/highlight/monokai.css'
import { presentations, loadTheme } from '../composables/usePresentations'
import AppNotFound from './AppNotFound.vue'

const props = defineProps({
  slug: { type: String, required: true },
})

const presentation = computed(() => presentations.find((p) => p.slug === props.slug) ?? null)

const params = new URLSearchParams(window.location.search)
const printMode = params.has('print-pdf')
const selectedTheme = params.get('theme') || presentation.value?.theme || 'black'

useHead({
  title: computed(() =>
    presentation.value ? `${presentation.value.title} – slides.kieks.me` : 'slides.kieks.me',
  ),
})

const revealEl = ref(null)
const textareaEl = ref(null)

onMounted(async () => {
  if (!presentation.value) return

  // Set content synchronously before any async suspension so the textarea is
  // always populated when RevealMarkdown reads it during deck.initialize().
  if (textareaEl.value) {
    // textContent avoids any HTML-parsing issues and is what RevealMarkdown reads
    textareaEl.value.textContent = presentation.value.content
  }

  // Load the theme CSS but never let a failure (e.g. a blocked Google Fonts
  // @import inside solarized.css delaying/rejecting the link onload event)
  // prevent the deck from being initialized.
  try {
    await loadTheme(selectedTheme)
  } catch {
    // Proceed with default styling if the theme CSS cannot be loaded.
  }

  if (!revealEl.value) return

  const deck = new Reveal(revealEl.value, {
    hash: true,
    controls: true,
    progress: true,
    center: true,
    slideNumber: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
  })

  await deck.initialize()
})
</script>

<template>
  <AppNotFound v-if="!presentation" />
  <div v-else>
    <div class="topbar" :class="{ 'hidden-for-print': printMode }">
      <a href="/" class="button secondary">← Übersicht</a>
      <div class="topbar-meta">
        <span>{{ presentation.title }}</span>
        <a
          :href="`/slides/${encodeURIComponent(slug)}?print-pdf&theme=${selectedTheme}`"
          class="button secondary"
          target="_blank"
          rel="noreferrer"
        >PDF/Print</a>
      </div>
    </div>

    <div ref="revealEl" class="reveal">
      <div class="slides">
        <section
          data-markdown
          data-separator="^\r?\n---\r?\n$"
          data-separator-vertical="^\r?\n--\r?\n$"
          data-separator-notes="^Note:"
        >
          <textarea ref="textareaEl" data-template></textarea>
        </section>
      </div>
    </div>
  </div>
</template>
