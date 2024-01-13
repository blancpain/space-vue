import { defineStore } from 'pinia';
import type { TUser } from '@/types/Auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [] as TUser[]
  }),
  // TODO: below is just for demo purposes, remove it
  getters: {
    enabledUsers(): TUser[] {
      return this.users.filter((user) => !user.disabled);
    }
  },
  actions: {
    addUser(user: TUser) {
      this.users.push(user);
    }
  }
});
