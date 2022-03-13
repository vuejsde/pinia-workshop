import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          books: [
            './src/views/BooksOutlet',
            './src/views/BookDetail',
            './src/views/BookList',
            './src/views/BookWatchList',
            './src/views/BookEdit',
            './src/views/BookNew',
          ],
        },
      },
    },
  },
});
