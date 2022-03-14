import { defineStore, storeToRefs } from 'pinia';
import { get, post } from '@/utils/http';
import type { Book } from '@/types';
import { useAuthStore } from './AuthStore';

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
    async create(book: Partial<Book>) {
      const { user } = storeToRefs(useAuthStore());
      const newBook = await post<Book>(
        `http://localhost:4730/books`,
        {
          ...book,
          userId: user.value?.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      this.books.push(newBook);
    },
  },
});
