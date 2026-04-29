import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

/**
 * Global singleton reactive isDark ref.
 * Mirrors the OS/browser dark-mode preference by default and can be toggled manually.
 * Consumed in setup/main.ts to apply a `data-theme` attribute on <html>,
 * and available to any component via import.
 */
const prefersDark = usePreferredDark()
export const isDark = ref(prefersDark.value)

// Keep in sync whenever the system preference changes
watch(prefersDark, (val) => {
  isDark.value = val
})

export function toggleDark(): void {
  isDark.value = !isDark.value
}
