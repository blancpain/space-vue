<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/');
    }
  },
  {
    label: 'Daily Picture',
    icon: 'pi pi-star',
    command: () => {
      router.push('/astro');
    }
  },
  {
    label: 'Earth View',
    icon: 'pi pi-globe',
    command: () => {
      router.push('/earth');
    }
  },
  {
    label: 'Epic',
    icon: 'pi pi-camera',
    command: () => {
      router.push('/epic');
    }
  },
  {
    label: 'Sign Up',
    icon: 'pi pi-user-plus',
    command: () => {
      router.push('/sign-up');
    }
  }
]);
</script>

<template>
  <header>
    <MenuBar :model="items" class="menu" />
  </header>

  <RouterView />
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.menu {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-evenly;
}
</style>
