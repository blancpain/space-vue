<script setup lang="ts">
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
</script>

<template>
  <main>
    <div v-for="user in authStore.users" :key="user.id">{{ user.name }} {{ user.email }}</div>
  </main>
</template>
