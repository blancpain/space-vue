<script setup lang="ts">
import { useGeolocation } from '@vueuse/core';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { ref, watch } from 'vue';

const { coords } = useGeolocation();
const coordsAvailable = ref(false);

watch(coords, () => {
  if (coords.value.latitude && coords.value.longitude && !coordsAvailable.value) {
    coordsAvailable.value = true;
  }
});
</script>

<template>
  <main>
    <h1>Check out the satelite view below</h1>
    <GMapMap
      v-if="coordsAvailable"
      :center="{ lat: coords.latitude, lng: coords.longitude }"
      :zoom="10"
      map-type-id="hybrid"
      style="height: 30rem; max-width: 700px"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
      }"
    />
    <div v-else-if="!coordsAvailable">
      <LoadingSpinner />
    </div>
    <div v-else>Something went wrong...</div>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
.vue-map-container {
  display: flex;
  justify-content: center;
}
</style>
