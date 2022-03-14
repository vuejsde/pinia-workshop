import { defineStore } from 'pinia';
import { get } from '@/utils/http';
import type { Book } from '@/types';

export type BookState = {
  books: Array<Book>;
};

export const useBookStore = defineStore('BookStore', {
  state: () =>
    ({
      books: [],
    } as BookState),
  getters: {},
  actions: {
    async getBooks() {
      const books = await get<Book[]>('http://localhost:4730/books');

      this.books = books;
    },
  },
});
