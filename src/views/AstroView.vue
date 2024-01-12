<script setup lang="ts">
import { getDailyPic } from '@/services/getDailyPic'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const { dailyPic, error, loading, fetchPic } = getDailyPic()
fetchPic()
</script>

<template>
  <main>
    <div v-if="dailyPic.url">
      <p>{{ dailyPic.explanation }}</p>
      <img :src="dailyPic.url" alt="Astronomy picture of the day" />
    </div>
    <div v-else-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="error">Error: {{ error }}</div>
  </main>
</template>
