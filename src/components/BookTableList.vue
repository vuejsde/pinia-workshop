<template>
  <div class="search-input">
    <label for="search">🔎 </label>
    <input id="search" v-model="search" placeholder="Search for books by title" />
  </div>

  <table>
    <BookListItem
      v-for="book in filteredBooks"
      :key="book.isbn"
      v-bind="book"
      :watched="!plain ? watchedBooks?.has(book.isbn) : false"
      @watch="$emit('watch', book)"
      :plain="plain"
    />
  </table>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import BookListItem from '@/components/BookListItem.vue';
import type { Book } from '../types';

type ComponentData = {
  search: string;
};

export default defineComponent({
  name: 'BookList',
  components: {
    BookListItem,
  },
  props: {
    books: {
      type: Object as PropType<Book[]>,
      required: true,
    },
    watchedBooks: {
      type: Object as PropType<Map<string, Book>>,
      default: () => ({}),
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },
  data(): ComponentData {
    return {
      search: '',
    };
  },
  computed: {
    filteredBooks(): Book[] {
      return this.books.filter((book) => book.title.includes(this.search));
    },
  },
  emits: {
    watch(book: Book) {
      if (!book) return false;
      return true;
    },
  },
});
</script>

<style lang="scss">
$grey-color: #dddddd;

table {
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border: 1px solid $grey-color;
    padding: 8px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4caf50;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: $grey-color;
  }
}

.search-input {
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    margin: 8px 0;
    display: inline-block;
    border-radius: 4px;
    padding: 20px 12px;
  }
}
</style>
