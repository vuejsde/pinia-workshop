import type { Book } from '@/types';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useWatchlistStore = defineStore('WatchlistStore', () => {
  const list = ref<Map<string, Book>>(
    new Map(JSON.parse(localStorage.getItem('watchlist') ?? '[]')),
  );

  const size = computed(() => list.value.size);

  function add(book: Book) {
    const isbn = book.isbn;
    if (list.value.has(isbn)) {
      list.value.delete(isbn);
    } else {
      list.value.set(isbn, book);
    }
  }

  function reset() {
    localStorage.setItem('watchlist', JSON.stringify([]));
    list.value.clear();
  }

  return {
    list,
    add,
    size,
    reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWatchlistStore, import.meta.hot));
}
