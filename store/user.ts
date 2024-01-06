import { defineStore } from 'pinia';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  token: string | null;
}

export const useUserStore = defineStore({
  id: 'user',
  
  state: (): { user: UserState } => ({
    user: {
      isAuthenticated: false,
      email: null,
      token: null
    }
  }),

  actions: {
    initStore() {
      this.user.isAuthenticated = false;

      if (localStorage.getItem('user.token')) {
        this.user.token = localStorage.getItem('user.token');
        this.user.email = localStorage.getItem('user.email');
        this.user.isAuthenticated = true;
      }
    },

    setToken(token: string, email: string) {
      this.user.token = token;
      this.user.email = email;
      this.user.isAuthenticated = true;

      localStorage.setItem('user.token', token);
      localStorage.setItem('user.email', email);
    },

    removeToken() {
      this.user.token = null;
      this.user.email = null;
      this.user.isAuthenticated = false;

      localStorage.setItem('user.token', '');
      localStorage.setItem('user.email', '');
    }
  }
});