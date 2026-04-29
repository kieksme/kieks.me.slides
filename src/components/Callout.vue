<script setup>
/**
 * Global reusable Callout component.
 * Registered in src/setup/main.ts so it is available in every template
 * without an explicit import.
 *
 * Usage:
 *   <Callout type="tip" title="Tipp">Some helpful text.</Callout>
 *   <Callout type="warning">Watch out!</Callout>
 */
defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (v) => ['info', 'tip', 'warning', 'danger'].includes(v),
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div :class="['callout', `callout--${type}`]" role="note">
    <strong v-if="title" class="callout__title">{{ title }}</strong>
    <slot />
  </div>
</template>

<style scoped>
.callout {
  border-left: 4px solid var(--callout-color, var(--brand-primary));
  background: rgba(63, 122, 248, 0.08);
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 0.75rem 1rem;
  margin: 0.75rem 0;
  color: var(--brand-text);
}

.callout--tip {
  --callout-color: #22c55e;
  background: rgba(34, 197, 94, 0.08);
}

.callout--warning {
  --callout-color: #f59e0b;
  background: rgba(245, 158, 11, 0.08);
}

.callout--danger {
  --callout-color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}

.callout__title {
  display: block;
  margin-bottom: 0.25rem;
}
</style>
