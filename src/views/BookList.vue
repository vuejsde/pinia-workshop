<template>
  <BookTableList :books="books" :watched-books="watchedBooks" @watch="addToWatchlist" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BookTableList from '../components/BookTableList.vue';
import http from '@/utils/http';
import type { Book } from '../types';

type ComponentData = {
  search: string;
  books: Book[];
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
      books: [],
      watchedBooks: new Map(),
    };
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
    async getBooks() {
      const books = await http<Book[]>('http://localhost:4730/books');
      this.books = books;
    },
  },
  created() {
    this.getBooks();
  },
});
</script>
