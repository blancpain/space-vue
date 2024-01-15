<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import Calendar from 'primevue/calendar';
import Fieldset from 'primevue/fieldset';
import Image from 'primevue/image';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { ref, onMounted, watch } from 'vue';
import { db, auth } from '@/config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useToast } from 'primevue/usetoast';
import type { TUserFavorites } from '@/types';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { getDailyPic } from '@/services';

const currentDate = ref(new Date());
const { dailyPic, loading, fetchPic } = getDailyPic();
const isFavorite = ref(false);
const heartIcon = ref('pi pi-heart');
const toast = useToast();
const userFavorites = ref<TUserFavorites[]>([]);
const firestoreUser = ref<QueryDocumentSnapshot>();

const loadFavorites = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  firestoreUser.value = querySnapshot.docs.find(
    (doc) => doc.data().email === auth.currentUser?.email
  );
  if (firestoreUser.value) {
    userFavorites.value = firestoreUser.value.data().favorites as TUserFavorites[];
    isFavorite.value = userFavorites.value
      .map((favorite) => favorite.title)
      .includes(dailyPic.value.title as string);
    heartIcon.value = isFavorite.value ? 'pi pi-heart-fill' : 'pi pi-heart';
  }
};

onMounted(async () => {
  fetchPic(currentDate.value);
});

watch(dailyPic, () => {
  loadFavorites();
});

const handleDateChange = () => {
  fetchPic(currentDate.value);
};

const toggleFavorite = async () => {
  // NOTE: we are changing the value of isFavorite before the async call to make the UI feel more responsive
  // an improvement might be to use localstorage to store the favorites and update the UI based on that
  if (!auth.currentUser) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'You need to be logged in to save a picture to favorites!',
      life: 6000
    });
    return;
  }

  if (!firestoreUser.value) {
    return;
  }

  isFavorite.value = !isFavorite.value;
  heartIcon.value = isFavorite.value ? 'pi pi-heart-fill' : 'pi pi-heart';

  const isSelectedFavorite = userFavorites.value
    .map((favorite) => favorite.title)
    .includes(dailyPic.value.title as string);

  if (isSelectedFavorite) {
    await updateDoc(doc(db, 'users', firestoreUser.value.id), {
      favorites: userFavorites.value.filter((favorite) => favorite.title !== dailyPic.value.title)
    });
  } else {
    await updateDoc(doc(db, 'users', firestoreUser.value.id), {
      favorites: [...userFavorites.value, { title: dailyPic.value.title, url: dailyPic.value.url }]
    });
  }
};
</script>

<template>
  <main>
    <Toast />
    <section class="header">
      <h1 class="header-title">
        Astronomy Picture of the Day:
        {{
          currentDate.toLocaleDateString(undefined, {
            weekday: 'long',
            day: '2-digit',
            month: 'long'
          })
        }}
      </h1>
      <Calendar
        showIcon
        v-model="currentDate"
        @date-select="handleDateChange"
        :maxDate="new Date()"
      />
    </section>
    <div v-if="dailyPic.url" class="pic-container">
      <Image :src="dailyPic.url" alt="NASA Astronomy picture of the day" width="300" preview />
      <Fieldset :legend="dailyPic.title" class="fieldset">
        <p class="m-0">{{ dailyPic.explanation }}</p>
        <Button :icon="heartIcon" rounded outlined aria-label="Favorite" @click="toggleFavorite" />
      </Fieldset>
    </div>
    <div v-else-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div class="no-image-message">
        <p>Looks like there is no image for this day. Try another day! 🪐</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 5rem;

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
.fieldset {
  max-width: 650px;
}
.p-image {
  display: flex;
}
.pic-container {
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
}

.no-image-message {
  text-align: center;
  margin-top: 2rem;
  font-size: 24px;
}
</style>
