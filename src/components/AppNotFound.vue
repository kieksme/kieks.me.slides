<script setup>
import { useHead } from '@unhead/vue'

useHead({ title: '404 – slides.kieks.me' })
</script>

<template>
  <main class="layout not-found">
    <h1>Präsentation nicht gefunden</h1>
    <p>Bitte prüfe den Namen in der URL oder gehe zurück zur Übersicht.</p>
    <a class="button" href="/">Zur Übersicht</a>
  </main>
</template>
