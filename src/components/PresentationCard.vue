<script setup>
defineProps({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
})
</script>

<template>
  <li class="card">
    <article>
      <h2>{{ title }}</h2>
      <p v-if="description">{{ description }}</p>
      <p v-if="tags.length" class="tags">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </p>
      <div class="actions">
        <a class="button" :href="`/slides/${encodeURIComponent(slug)}`">Starten</a>
        <a
          class="button secondary"
          :href="`/slides/${encodeURIComponent(slug)}?print-pdf`"
          target="_blank"
          rel="noreferrer"
        >PDF/Print</a>
      </div>
    </article>
  </li>
</template>
