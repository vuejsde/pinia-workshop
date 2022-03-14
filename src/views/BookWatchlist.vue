<template>
  <button @click="clear" v-if="count">Clear</button>
  <BookTableList :books="books" plain />
  <p v-if="!count" class="message info">
    There is nothing here yet! You can go ahead and add books to your watchlist from the books page
  </p>
</template>

<script lang="ts">
import { useWatchlistStore } from '@/stores/WatchlistStore';
import { mapState, mapActions } from 'pinia';
import { defineComponent } from 'vue';

import BookTableList from '../components/BookTableList.vue';

export default defineComponent({
  name: 'BookWatchlist',
  components: {
    BookTableList,
  },
  computed: {
    ...mapState(useWatchlistStore, {
      books: (state) => Array.from(state.list.values()),
      count: 'count',
    }),
  },
  methods: {
    ...mapActions(useWatchlistStore, ['clear']),
  },
});
</script>
