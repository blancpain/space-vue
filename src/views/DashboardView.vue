<script setup lang="ts">
import { auth, db } from '@/config';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import type { TUserFavorites } from '@/types';
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';
import Image from 'primevue/image';

// TODO: add loading state for images
// fix style when title on new row
const userFavorites = ref<TUserFavorites[]>([]);
const firestoreUser = ref<QueryDocumentSnapshot>();
const currentUser = auth.currentUser;

const handleRemoveFromFavorites = async (title: string) => {
  if (!firestoreUser.value) return;
  await updateDoc(doc(db, 'users', firestoreUser.value.id), {
    favorites: userFavorites.value.filter((favorite) => favorite.title !== title)
  });
  userFavorites.value = userFavorites.value.filter((favorite) => favorite.title !== title);
};

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  firestoreUser.value = querySnapshot.docs.find(
    (doc) => doc.data().email === auth.currentUser?.email
  );
  userFavorites.value = firestoreUser.value?.data().favorites as TUserFavorites[];
});

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);
</script>

<template>
  <main>
    <h3>Hey there, {{ currentUser?.displayName }}!</h3>
    <p>You can view and edit your favorite images directly from your profile.</p>
    <div v-if="userFavorites.length">
      <Carousel
        :value="userFavorites"
        :numVisible="3"
        :numScroll="3"
        :responsiveOptions="responsiveOptions"
        style="margin-top: 2rem"
      >
        <template #item="slotProps">
          <div class="carousel-inner">
            <Image preview width="150" :src="slotProps.data.url" :alt="slotProps.data.title" />
            <h4>{{ slotProps.data.title }}</h4>
            <Button
              icon="pi pi-times"
              rounded
              @click="() => handleRemoveFromFavorites(slotProps.data.title)"
            />
          </div>
        </template>
      </Carousel>
    </div>
    <div v-else>
      Looks you don't have any pictures saved! Click

      <router-link to="/astro">here</router-link>

      to start exploring.
    </div>
  </main>
</template>

<style scoped>
.p-image {
  display: flex;
  height: 100px;
}
.carousel-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
