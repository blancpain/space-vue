import { defineStore } from 'pinia';
import type { TUser } from '@/types';

export const useAuthStore = defineStore('auth', {
  state: (): TUser => ({
    name: '',
    email: ''
  }),
  actions: {
    setUser(user: TUser) {
      this.name = user.name;
      this.email = user.email;
    },
    clearUser() {
      this.name = '';
      this.email = '';
    }
  }
});
