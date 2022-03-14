<template>
  <BookTableList :books="books" :watched-books="watchedBooks" @watch="addToWatchlist" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BookTableList from '../components/BookTableList.vue';
import type { Book } from '../types';
import { mapActions, mapState } from 'pinia';
import { useBookStore } from '@/stores/BookStore';
import { useWatchlistStore } from '@/stores/WatchlistStore';

type ComponentData = {
  search: string;
};

export default defineComponent({
  name: 'BookList',
  components: {
    BookTableList,
  },
  data(): ComponentData {
    return {
      search: '',
    };
  },
  computed: {
    ...mapState(useBookStore, ['books']),
    ...mapState(useWatchlistStore, {
      watchedBooks: 'list',
    }),
  },
  methods: {
    ...mapActions(useBookStore, ['getBooks']),
    ...mapActions(useWatchlistStore, ['update']),
    addToWatchlist(book: Book) {
      this.update(book);
    },
  },
  created() {
    this.getBooks();
  },
});
</script>
