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
    <div v-if="coordsAvailable">
      <GMapMap
        :center="{ lat: coords.latitude, lng: coords.longitude }"
        :zoom="10"
        map-type-id="hybrid"
        style="width: 100vw; height: 20rem"
        :options="{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true
        }"
      />
    </div>
    <div v-else-if="!coordsAvailable">
      <LoadingSpinner />
    </div>
    <div v-else>Something went wrong...</div>
  </main>
</template>
