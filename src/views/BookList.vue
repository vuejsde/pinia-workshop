<template>
  <BookTableList :books="books" :watched-books="watchedBooks" @watch="addToWatchlist" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BookTableList from '../components/BookTableList.vue';
import type { Book } from '../types';
import { mapActions, mapState } from 'pinia';
import { useBookStore } from '@/stores/BookStore';

type ComponentData = {
  search: string;
  watchedBooks: Map<string, Book>;
};

export default defineComponent({
  name: 'BookList',
  components: {
    BookTableList,
  },
  data(): ComponentData {
    return {
      search: '',
      watchedBooks: new Map(),
    };
  },
  computed: {
    ...mapState(useBookStore, ['books']),
  },
  methods: {
    addToWatchlist(book: Book) {
      const isbn = book.isbn;
      if (this.watchedBooks.has(isbn)) {
        this.watchedBooks.delete(isbn);
      } else {
        this.watchedBooks.set(isbn, book);
      }
    },
    ...mapActions(useBookStore, ['getBooks']),
  },
  created() {
    this.getBooks();
  },
});
</script>
