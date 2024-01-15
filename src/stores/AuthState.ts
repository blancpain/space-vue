import { defineStore } from 'pinia';

export const useAuthStateStore = defineStore('authState', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    setLoggedIn(value: boolean) {
      this.isLoggedIn = value;
    }
  }
});
