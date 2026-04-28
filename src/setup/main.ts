import type { App } from 'vue'
import { watch } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import { isDark } from '../composables/useDark'
import Callout from '../components/Callout.vue'

/**
 * config-vue equivalent for this project.
 *
 * Called once in src/main.js before app.mount() and wires up:
 *   1. Global reusable components  – available in every Vue template
 *   2. Pinia                       – cross-component state management
 *   3. @unhead/vue                 – reactive <head> / meta-tag management
 *   4. provide()                   – site-wide config injectable via inject()
 *   5. isDark watcher              – syncs dark-mode preference to <html data-theme>
 */
export function applyAppSetup(app: App): void {
  // 1. Global components – registered once, usable in every template without importing
  app.component('Callout', Callout)

  // 2. Pinia – install before any store is accessed
  app.use(createPinia())

  // 3. @unhead/vue – useHead() is now available in every component
  app.use(createHead())

  // 4. Global provide – components can call inject('siteConfig') to read these values
  app.provide('siteConfig', {
    name: 'slides.kieks.me',
    author: 'kieksme',
    baseUrl: 'https://slides.kieks.me',
  })

  // 5. isDark watcher – keep <html data-theme> in sync for CSS theming hooks
  watch(
    isDark,
    (dark) => {
      document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    },
    { immediate: true },
  )
}
