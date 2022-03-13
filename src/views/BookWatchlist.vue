<template>
  <BookTableList :books="books" plain />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BookTableList from '../components/BookTableList.vue';
import http from '@/utils/http';
import type { Book } from '../types';

type ComponentData = {
  books: Book[];
};

export default defineComponent({
  name: 'BookWatchlist',
  components: {
    BookTableList,
  },
  data(): ComponentData {
    return {
      books: [],
    };
  },
  methods: {
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
