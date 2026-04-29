import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * App-wide Pinia store.
 * Keeps the landing-page search query alive so it is restored when the user
 * navigates back from a presentation.
 */
export const useAppStore = defineStore('app', () => {
  const searchQuery = ref('')

  return { searchQuery }
})
