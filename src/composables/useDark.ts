import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

/**
 * Global singleton reactive isDark ref.
 * Mirrors the OS/browser dark-mode preference by default and can be toggled manually.
 * Consumed in setup/main.ts to apply a `data-theme` attribute on <html>,
 * and available to any component via import.
 */
export const isDark = ref(
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
)

// Keep in sync whenever the system preference changes
const prefersDark = usePreferredDark()
watch(prefersDark, (val) => {
  isDark.value = val
})

export function toggleDark(): void {
  isDark.value = !isDark.value
}
