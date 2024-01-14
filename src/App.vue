<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { ref } from 'vue';
import { auth } from './config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { onMounted } from 'vue';
import { useAuthStore } from './stores';

const router = useRouter();
const isLoggedIn = ref(false);
const isLoading = ref(true);
const authStore = useAuthStore();

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
  }
]);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user && user.email && user.displayName) {
      isLoggedIn.value = true;
      authStore.addUser({ email: user.email, name: user.displayName });
    } else {
      isLoggedIn.value = false;
    }
    isLoading.value = false;
  });
});
const handleSignOut = async () => {
  await signOut(auth);
  isLoggedIn.value = false;
  router.push('/');
};
</script>

<template>
  <header>
    <MenuBar :model="routes" class="menu">
      <template #end>
        <div v-show="!isLoading">
          <div class="auth-buttons" v-if="!isLoggedIn">
            <PrimeButton
              icon="pi pi-user-plus"
              iconPos="left"
              label="Sign Up"
              size="small"
              @click="$router.push('/sign-up')"
            />
            <PrimeButton
              icon="pi pi-sign-in"
              iconPos="left"
              label="Login"
              size="small"
              outlined
              @click="$router.push('/sign-in')"
            />
          </div>
          <PrimeButton
            v-if="isLoggedIn"
            icon="pi pi-sign-out"
            iconPos="left"
            label="Logout"
            size="small"
            @click="handleSignOut"
          />
        </div>
      </template>
    </MenuBar>
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
.auth-buttons {
  display: flex;
  gap: 1rem;
}
</style>
