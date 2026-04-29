<script setup>
import AppLanding from './components/AppLanding.vue'
import AppSlides from './components/AppSlides.vue'
import AppNotFound from './components/AppNotFound.vue'

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

const path = normalizePath(window.location.pathname)
const slug = path.startsWith('/slides/')
  ? decodeURIComponent(path.replace('/slides/', ''))
  : null

function getView(p) {
  if (p === '/') return 'landing'
  if (p.startsWith('/slides/')) return 'slides'
  return 'not-found'
}

const view = getView(path)
</script>

<template>
  <AppLanding v-if="view === 'landing'" />
  <AppSlides v-else-if="view === 'slides' && slug" :slug="slug" />
  <AppNotFound v-else />
</template>
