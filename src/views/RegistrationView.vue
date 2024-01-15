<template>
  <main class="main">
    <Toast />
    <FormKit
      type="form"
      id="registration"
      submit-label="Register"
      @submit="handleSubmit"
      :actions="false"
    >
      <h1 class="text-2xl font-bold mb-2">Sign up today!</h1>
      <FormKit
        type="text"
        name="name"
        label="Your name"
        placeholder="Eden Tech Labs"
        validation="required"
      />
      <FormKit
        type="text"
        name="email"
        label="Your email"
        placeholder="eden@techLabs.com"
        validation="required|email"
      />
      <div class="double">
        <FormKit
          type="password"
          name="password"
          label="Password"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Please include at least one symbol'
          }"
          placeholder="Your password"
        />
        <FormKit
          type="password"
          name="password_confirm"
          label="Confirm password"
          placeholder="Confirm password"
          validation="required|confirm"
        />
      </div>

      <Button type="submit">Sign Up</Button>
    </FormKit>
  </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { auth } from '@/config';
import Toast from 'primevue/toast';
import { db } from '@/config';
import { collection, addDoc } from 'firebase/firestore';
import type { TUserFavorites } from '@/types';

type TRegistrationForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const toast = useToast();
const router = useRouter();

const handleSubmit = async (values: TRegistrationForm) => {
  const registerUser = await createUserWithEmailAndPassword(auth, values.email, values.password);

  if (registerUser) {
    await updateProfile(registerUser.user, {
      displayName: values.name
    });

    // TODO: error handling for db errors
    await addDoc(collection(db, 'users'), {
      email: values.email,
      favorites: [] as TUserFavorites[]
    });

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User registered successfully. You will now be redirected to the login page.',
      life: 4000
    });
    setTimeout(() => {
      router.push('/sign-in');
    }, 4000);
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong. Please try again.',
      life: 4000
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
