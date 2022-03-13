<template>
  <p v-if="success" class="message success">Successfully logged in.</p>

  <form novalidate @submit.prevent="submit">
    <p>
      <label for="email">E-Mail</label>
      <input type="text" v-model="user.email" name="email" id="email" />
    </p>
    <p>
      <label for="password">Password</label>
      <input type="password" v-model="user.password" name="password" id="password" />
    </p>
    <p>
      <button type="submit">Login</button>
    </p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapWritableState } from 'pinia';

import { useAuthStore, type User } from '@/stores/AuthStore';
import { post } from '@/utils/http';

type ComponentData = {
  user: {
    email: string;
    password: string;
  };
  success: boolean;
};

export default defineComponent({
  name: 'BookNew',
  data(): ComponentData {
    return {
      user: {
        email: '',
        password: '',
      },
      success: false,
    };
  },
  computed: {
    ...mapWritableState(useAuthStore, {
      authUser: 'user',
      authToken: 'authToken',
    }),
  },
  methods: {
    async submit() {
      this.success = false;

      const response = await post<{
        accessToken: string | null;
        user: User | null;
      }>(`http://localhost:4730/login`, this.user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.authToken = response.accessToken;
      this.authUser = response.user;
      this.success = true;
    },
  },
});
</script>
