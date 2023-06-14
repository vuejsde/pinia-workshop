<template>
  <BookTableList
    :books="bookStore.books"
    :watched-books="watchlistStore.list"
    @watch="watchlistStore.add"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useBookStore } from '../stores/BookStore';
import { useWatchlistStore } from '../stores/WatchlistStore';
import BookTableList from '../components/BookTableList.vue';

export default defineComponent({
  name: 'BookList',
  components: {
    BookTableList,
  },
  setup() {
    const search = ref('');

    const watchlistStore = useWatchlistStore();
    const bookStore = useBookStore();

    bookStore.get();

    return {
      search,
      watchlistStore,
      bookStore,
    };
  },
});
</script>
