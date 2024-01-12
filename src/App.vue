<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/')
    }
  },
  {
    label: 'Daily Picture',
    icon: 'pi pi-star',
    command: () => {
      router.push('/astro')
    }
  },
  {
    label: 'Earth View',
    icon: 'pi pi-globe',
    command: () => {
      router.push('/earth')
    }
  },
  {
    label: 'Epic',
    icon: 'pi pi-camera',
    command: () => {
      router.push('/epic')
    }
  }
])
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

/* NOTE: check if we need below*/

/* @media (min-width: 1024px) { */
/*   header { */
/*     display: flex; */
/*     place-items: center; */
/*     padding-right: calc(var(--section-gap) / 2); */
/*   } */
/**/
/*   .logo { */
/*     margin: 0 2rem 0 0; */
/*   } */
/* } */
</style>
