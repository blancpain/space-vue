<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { getEpicImage } from '@/services';

const { epicImageURL, error, loading, fetchImage } = getEpicImage();
fetchImage();
</script>

<template>
  <main>
    <div v-if="epicImageURL">
      <img :src="epicImageURL" alt="Most recent EPIC image from NASA" />
    </div>
    <div v-else-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="error">Error: {{ error }}</div>
  </main>
</template>
