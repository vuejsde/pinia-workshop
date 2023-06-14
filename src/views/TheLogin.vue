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
import { defineComponent, reactive, toRefs } from 'vue';

import { useAuthStore } from '@/stores/AuthStore';

type ComponentData = {
  user: {
    email: string;
    password: string;
  };
  success: boolean;
};

export default defineComponent({
  name: 'BookNew',
  setup() {
    const state = reactive<ComponentData>({
      user: {
        email: '',
        password: '',
      },
      success: false,
    });
    const authStore = useAuthStore();

    async function submit() {
      state.success = false;

      authStore.login(state.user);

      state.success = true;
    }

    return {
      submit,
      ...toRefs(state),
    };
  },
});
</script>
