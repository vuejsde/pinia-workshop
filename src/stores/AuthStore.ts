import { defineStore } from 'pinia';
import { post } from '@/utils/http';

export type User = {
  email: string;
  id: number;
};

export type AuthState = {
  authToken: string | null;
  user: User | null;
};

export const useAuthStore = defineStore('AuthStore', {
  state: () =>
    ({
      user: null,
      authToken: null,
    } as AuthState),
  getters: {
    email: (state) => state.user?.email ?? '',
    isAuthenticated(): boolean {
      return !!this.email;
    },
  },
  actions: {
    async login(user: { email: string; password: string }) {
      const response = await post<{
        accessToken: string | null;
        user: User | null;
      }>(`http://localhost:4730/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.authToken = response.accessToken;
      this.user = response.user;
    },
  },
});
