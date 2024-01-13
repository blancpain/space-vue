<template>
  <main class="main">
    <ToastVue />
    <FormKit
      type="form"
      id="registration-example"
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
import { useAuthStore } from '@/stores';
import { nanoid } from 'nanoid';
import Button from 'primevue/button';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from 'primevue/usetoast';

type TRegistrationForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const toast = useToast();
const authStore = useAuthStore();

const handleSubmit = async (values: TRegistrationForm) => {
  const registerUser = await createUserWithEmailAndPassword(
    getAuth(),
    values.email,
    values.password
  );

  if (registerUser) {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User registered successfully',
      life: 8000
    });
  }

  authStore.addUser({ id: nanoid(), name: values.name, email: values.email, disabled: false });
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
