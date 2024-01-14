import { defineStore } from 'pinia';
import type { TUser } from '@/types/Auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [] as TUser[]
  }),
  actions: {
    addUser(user: TUser) {
      this.users.push(user);
    }
  }
});
