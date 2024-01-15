<template>
  <main class="main">
    <Toast />
    <FormKit type="form" id="login" submit-label="Login" @submit="handleLogin" :actions="false">
      <h1 class="text-2xl font-bold mb-2">Login</h1>
      <FormKit
        type="text"
        name="email"
        label="Your email"
        placeholder="eden@techLabs.com"
        validation="required|email"
      />
      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required"
        placeholder="Your password"
      />

      <Button type="submit">Sign In</Button>
    </FormKit>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore, useAuthStateStore } from '@/stores';
import Button from 'primevue/button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from 'primevue/usetoast';
import { auth } from '@/config';
import { useRouter } from 'vue-router';
import Toast from 'primevue/toast';

type TLoginForm = {
  email: string;
  password: string;
};
const toast = useToast();
const authStore = useAuthStore();
const authStateStore = useAuthStateStore();
const router = useRouter();

const handleLogin = async (values: TLoginForm) => {
  try {
    const res = await signInWithEmailAndPassword(auth, values.email, values.password);

    if (res.user && res.user.email && res.user.displayName) {
      authStore.setUser({ email: res.user.email, name: res.user.displayName });

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You are now logged in!',
        life: 1000
      });

      authStateStore.setLoggedIn(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  } catch (error) {
    // TODO: improve error handling
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong. Please try again.',
      life: 6000
    });
  }
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
}

button {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
