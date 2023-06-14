<template>
  <div class="message info" v-if="!size">There is nothing here yet!</div>
  <template v-else>
    <button @click="watchlistStore.reset">Clear</button>
    <BookTableList :books="books" plain />
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { storeToRefs } from 'pinia';

import BookTableList from '../components/BookTableList.vue';
import { useWatchlistStore } from '../stores/WatchlistStore';

export default defineComponent({
  name: 'BookWatchlist',
  components: {
    BookTableList,
  },
  setup() {
    const watchlistStore = useWatchlistStore();
    const { list, size } = storeToRefs(watchlistStore);

    const books = computed(() => [...list.value.values()]);

    return {
      books,
      size,
      watchlistStore,
    };
  },
});
</script>
