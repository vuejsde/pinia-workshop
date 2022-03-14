import { defineStore } from 'pinia';
import type { Book } from '@/types';

export type WatchlistStore = {
  list: Map<string, Book>;
};

export const useWatchlistStore = defineStore('WatchlistStore', {
  state: () =>
    ({
      list: new Map(),
    } as WatchlistStore),
  getters: {
    count: (state) => state.list.size,
  },
  actions: {
    add(book: Book) {
      this.list.set(book.isbn, book);
    },
    remove(book: Book) {
      this.list.delete(book.isbn);
    },
    update(book: Book) {
      if (this.list.has(book.isbn)) {
        this.list.delete(book.isbn);
      } else {
        this.list.set(book.isbn, book);
      }
    },
    clear() {
      this.$reset();
    },
  },
});
