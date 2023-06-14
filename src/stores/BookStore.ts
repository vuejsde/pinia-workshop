import type { Book } from '@/types';
import http, { post } from '@/utils/http';
import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from './AuthStore';

export const useBookStore = defineStore('BookStore', () => {
  const books = ref<Book[]>([]);
  const { user } = storeToRefs(useAuthStore());

  async function get() {
    const booksResponse = await http<Book[]>('http://localhost:4730/books');
    books.value = booksResponse;
  }

  async function create(book: Partial<Book>) {
    const newBook = await post<Book>(
      `http://localhost:4730/books`,
      {
        ...book,
        userId: user.value?.id ?? null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    books.value.push(newBook);
  }

  return {
    books,
    get,
    create,
  };
});
