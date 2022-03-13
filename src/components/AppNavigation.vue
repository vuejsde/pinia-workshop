<template>
  <header>
    <nav class="navigation">
      <ul>
        <li><router-link :to="{ name: 'Books' }">Books</router-link></li>
        <li><router-link :to="{ name: 'About' }">About</router-link></li>
        <li><router-link :to="{ name: 'BookNew' }">New Book</router-link></li>
        <li><router-link :to="{ name: 'Login' }">Login</router-link></li>
      </ul>
    </nav>
    <div class="actions">
      <router-link :to="{ name: 'BookWatchlist' }">
        <div class="watchlist">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--mdi"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m17 19.09l2.45 1.49l-.65-2.81l2.2-1.88l-2.89-.25L17 13l-1.13 2.64l-2.87.25l2.18 1.88l-.68 2.81l2.5-1.49M4 14h8v2H4v-2m0-8h12v2H4V6m0 4h12v2H4v-2Z"
            ></path>
          </svg>
          <span class="badge">{{ watchlistItems }}</span>
        </div>
      </router-link>
      <div v-if="isAuthenticated" class="user">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--ph"
          width="32"
          height="32"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
          ></path>
        </svg>
        {{ email }}
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';

import { useAuthStore } from '@/stores/AuthStore';

export default defineComponent({
  data() {
    return {
      watchlistItems: 6,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['email', 'isAuthenticated']),
  },
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 50px;
  box-shadow: 0 1px 8px #ddd;

  li {
    list-style: none;
    display: inline-block;
  }

  a {
    text-decoration: none;
    padding: 20px;
    color: #555;
    transition: all 0.3s ease 0s;

    &:hover {
      color: #4caf50;
    }

    &.router-link-exact-active {
      background-color: #4caf50;
      color: #fff;
    }
  }
}

.navigation {
  display: flex;
}

.actions {
  margin-left: auto;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.watchlist {
  position: relative;
  display: flex;
}

.user {
  display: flex;
  align-items: center;

  svg {
    height: 1.5rem;
  }
}
</style>
