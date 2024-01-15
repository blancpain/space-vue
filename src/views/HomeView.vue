<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from 'primevue/button';
import { useAuthStore } from '@/stores';
import { watch, ref } from 'vue';
import type { TUser } from '@/types';
import { onMounted } from 'vue';
import BlockQuote from '@/components/BlockQuote.vue';

const authStore = useAuthStore();
const currentUser = ref<TUser>({ name: '', email: '' });

watch(authStore, () => {
  currentUser.value.name = authStore.name;
});

onMounted(() => {
  currentUser.value.name = authStore.name;
});
</script>

<template>
  <main class="home">
    <h1 v-if="currentUser.name">Welcome to Space View, {{ currentUser.name }}! ✨</h1>
    <h1 v-else>Welcome to Space View! ✨</h1>

    <BlockQuote
      quote-text="Exploring the cosmos has never been more captivating. Dive into the wonders of space with
        Space View's unique features."
    />

    <Accordion :activeIndex="0">
      <AccordionTab header="Daily Astronomy Picture from NASA">
        <p class="m-0">
          Explore a captivating astronomy picture from NASA every day. Use the calendar to navigate
          through different dates. If you register, you will also be able to save your favorite
          pictures.
        </p>
      </AccordionTab>
      <AccordionTab header="Satellite View">
        <p class="m-0">
          Take a virtual tour with the satellite view of your current location. Roam freely and
          discover the beauty of Earth from space.
        </p>
      </AccordionTab>
      <AccordionTab header="Latest EPIC Pictures">
        <p class="m-0">
          Stay updated with the latest EPIC (Earth Polychromatic Imaging Camera) pictures from NASA.
          Experience the breathtaking views of our planet.
        </p>
      </AccordionTab>
    </Accordion>
    <div class="registration-prompt" v-if="currentUser.name">
      <p>Ready to explore the cosmos?</p>
      <Button @click="$router.push('/dashboard')" label="Go to Dashboard" />
    </div>
    <div class="registration-prompt" v-else>
      <p>Ready to explore the cosmos?</p>
      <Button @click="$router.push('/sign-up')" label="Register" />
      <p>Already have an account?</p>
      <Button @click="$router.push('/sign-in')" label="Log in" />
    </div>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
}

p {
  font-size: 1.2em;
  color: #555;
}

.registration-prompt {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-self: center;
}
</style>
