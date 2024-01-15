<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { getEpicImage } from '@/services';
import { buildEpicUrl } from '@/utils';
import Image from 'primevue/image';

const { epicImages, error, loading, fetchImage } = getEpicImage();
fetchImage();
</script>

<template>
  <main>
    <section class="header">
      <h1 class="header-title">Most recent EPIC Images from NASA</h1>
    </section>
    <div class="image-grid" v-if="epicImages.length">
      <div v-for="image in epicImages" :key="image.identifier" class="image-card">
        <div class="image-inner">
          <Image preview width="250" :src="buildEpicUrl(image)" alt="EPIC Image from NASA" />
          <h4>{{ image.date }}</h4>
        </div>
      </div>
    </div>
    <div v-else-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="error">Error: {{ error }}</div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 0;
    margin-top: 0;
    margin-bottom: 1rem;
    flex-direction: column;
  }
}

.header-title {
  font-size: 28px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.image-card {
  margin: 1.5rem;
  border-radius: 10px;
  overflow: hidden;
  background-color: black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}

.image-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
}

.image-inner h4 {
  margin-top: 0.5rem;
  color: white;
}
</style>
