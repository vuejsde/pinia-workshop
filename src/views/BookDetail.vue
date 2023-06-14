<template>
  <h1>
    {{ book.title }}
    (<router-link :to="{ name: 'BookEdit', params: { isbn: isbn } }">Edit</router-link>)
  </h1>
  <ol>
    <li v-for="(value, key) in book" :key="key">{{ key }}: {{ value }}</li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import type { Book } from '@/types';
import http from '@/utils/http';

export default defineComponent({
  name: 'BookDetail',
  setup() {
    const book = ref<Partial<Book>>({});
    const isbn = ref<string | null>(null);
    const router = useRouter();

    async function getBook() {
      book.value = await http<Book>(`http://localhost:4730/books/${isbn.value}`);
    }

    function init(newIsbn: string) {
      isbn.value = newIsbn;
      getBook();
    }

    init(router.currentRoute.value.params.isbn as string);

    onBeforeRouteUpdate((to) => {
      init(to.params.isbn as string);
    });

    return {
      book,
      isbn,
      getBook,
      init,
    };
  },
});
</script>

<style scoped>
ol {
  list-style: none;
  text-align: left;
}
</style>
