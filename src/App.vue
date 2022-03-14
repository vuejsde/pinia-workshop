<template>
  <AppNavigation />
  <main class="content">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppNavigation from '@/components/AppNavigation.vue';
import { useAuthStore } from './stores/AuthStore';

export default defineComponent({
  name: 'App',
  components: {
    AppNavigation,
  },
  created() {
    const authStore = useAuthStore();
    authStore.$onAction(({ name, args, after }) => {
      if (name === 'login') {
        console.log(`Triggered 'LOGIN', with the following args`, args);
        console.log('There is no authToken yet:', authStore.authToken);
        after(() => {
          console.log('Login completed', authStore.authToken);
        });
      }
    });
  },
});
</script>

<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.content {
  padding: 20px;
  max-width: 1080px;
  margin: auto;
}

input,
textarea {
  width: 100%;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  padding: 20px 12px;
}

input[type='button'],
input[type='submit'],
input[type='reset'],
button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;

  &.info {
    color: #059;
    background-color: #bef;
  }

  &.success {
    color: #270;
    background-color: #dff2bf;
  }

  &.warning {
    color: #9f6000;
    background-color: #feefb3;
  }

  &.error {
    color: #d8000c;
    background-color: #ffbaba;
  }
}

.badge {
  display: inline-block;
  padding-left: 4px;
  padding-right: 4px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background-color: #f44336;
  position: absolute;
  top: -3px;
  left: -3px;
  font-size: 0.75rem;
}
</style>
