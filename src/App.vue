<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { auth } from './config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuthStore, useAuthStateStore } from './stores';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';

const router = useRouter();
const isLoading = ref(true);
const authStore = useAuthStore();
const authStateStore = useAuthStateStore();

const routes = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/');
    }
  },
  {
    label: 'Daily Picture',
    icon: 'pi pi-heart',
    command: () => {
      router.push('/astro');
    }
  },
  {
    label: 'Satelite View',
    icon: 'pi pi-globe',
    command: () => {
      router.push('/earth');
    }
  },
  {
    label: 'EPIC Pictures',
    icon: 'pi pi-camera',
    command: () => {
      router.push('/epic');
    }
  }
]);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user && user.email && user.displayName) {
      authStateStore.setLoggedIn(true);
      authStore.setUser({ email: user.email, name: user.displayName });
    } else {
      authStateStore.setLoggedIn(false);
      authStore.clearUser();
    }
    isLoading.value = false;
    authStateStore.setLoggedIn(false);
  });
});
const handleSignOut = async () => {
  await signOut(auth);
  authStateStore.setLoggedIn(false);
  router.push('/');
  authStore.clearUser();
};
</script>

<template>
  <header>
    <Menubar :model="routes" class="navbar">
      <template #end>
        <div v-show="!isLoading">
          <div class="unlogged-buttons" v-if="!authStateStore.isLoggedIn">
            <Button
              icon="pi pi-user-plus"
              iconPos="left"
              label="Sign Up"
              size="small"
              @click="$router.push('/sign-up')"
            />
            <Button
              icon="pi pi-sign-in"
              iconPos="left"
              label="Login"
              size="small"
              outlined
              @click="$router.push('/sign-in')"
            />
          </div>
          <div class="logged-buttons" v-if="authStateStore.isLoggedIn">
            <Avatar
              icon="pi pi-user"
              shape="circle"
              @click="$router.push('/dashboard')"
              class="avatar"
            />
            <Button
              icon="pi pi-sign-out"
              iconPos="left"
              label="Logout"
              size="small"
              @click="handleSignOut"
            />
          </div>
        </div>
      </template>
    </Menubar>
  </header>

  <RouterView />
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.navbar {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-evenly;
}
.unlogged-buttons {
  display: flex;
  gap: 1rem;
}
.logged-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.avatar {
  cursor: pointer;
}
</style>
