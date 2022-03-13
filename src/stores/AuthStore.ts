import { defineStore } from 'pinia';

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
});
