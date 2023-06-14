import { post } from '@/utils/http';
import { defineStore } from 'pinia';
import { computed, reactive, toRefs } from 'vue';

export type User = {
  email: string;
  password?: string;
  id: number;
};

export type AuthState = {
  authToken: string | null;
  user: User | null;
};

export const useAuthStore = defineStore('AuthStore', () => {
  const state = reactive<AuthState>({
    user: null,
    authToken: null,
  });

  const userEmail = computed(() => state?.user?.email ?? 'Anonymous');
  const isLoggedIn = computed(() => userEmail.value !== 'Anonymous');

  async function login(formUser: Required<Omit<User, 'id'>>) {
    const response = await post<{
      accessToken: string | null;
      user: User | null;
    }>(`http://localhost:4730/login`, formUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    state.authToken = response.accessToken;
    state.user = response.user;
  }

  return {
    ...toRefs(state),
    isLoggedIn,
    userEmail,
    login,
  };
});
