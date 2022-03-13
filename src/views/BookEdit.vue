<template>
  <form novalidate @submit.prevent="submit">
    <p>
      <label for="title">Title</label>
      <input
        type="text"
        v-model="book.title"
        name="title"
        id="title"
        @change="validateTitle"
        :class="{ 'is-invalid': !!errors.title }"
      />
      <span v-if="errors.title">{{ errors.title }}</span>
    </p>
    <p>
      <label for="abstract">Abstract</label>
      <textarea
        cols="50"
        rows="10"
        v-model="book.abstract"
        name="abstract"
        id="abstract"
        @change="validateAbstract"
        :class="{ 'is-invalid': !!errors.abstract }"
      ></textarea>
      <span v-if="errors.abstract">{{ errors.abstract }}</span>
    </p>
    <p>
      <label for="author">Author</label>
      <input
        type="text"
        v-model="book.author"
        name="author"
        id="author"
        @change="validateAuthor"
        :class="{ 'is-invalid': !!errors.author }"
      />
      <span v-if="errors.author">{{ errors.author }}</span>
    </p>
    <p>
      <button type="submit" :disabled="isInvalid">Submit</button>
    </p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { Book } from '@/types';
import { get, put } from '@/utils/http';
import { required, minLength } from '@/utils/validations';

type ComponentData = {
  book: Partial<Book>;
  isbn: string | null;
  errors: {
    [P in keyof Partial<Book>]: string;
  };
};

export default defineComponent({
  name: 'BookEdit',
  data(): ComponentData {
    return {
      book: {},
      isbn: null,
      errors: {
        title: '',
        abstract: '',
        author: '',
      },
    };
  },
  computed: {
    isInvalid(): boolean {
      return Object.keys(this.errors).some(
        (val) => this.errors[val as keyof ComponentData['errors']] !== '',
      );
    },
  },
  methods: {
    async getBook() {
      this.book = await get<Book>(`http://localhost:4730/books/${this.isbn}`);
    },
    init(isbn: string) {
      this.isbn = isbn;
      this.getBook();
    },
    async submit() {
      this.book = await put<Book>(`http://localhost:4730/books/${this.isbn}`, this.book, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    validateTitle() {
      if (!required(this.book?.title ?? '')) {
        this.errors.title = 'Title is required.';
      } else if (!minLength(this.book?.title ?? '', 5)) {
        this.errors.title = 'The title must be at least 5 characters long.';
      } else {
        this.errors.title = '';
      }
    },
    validateAbstract() {
      if (!required(this.book?.abstract ?? '')) {
        this.errors.abstract = 'Abstract is required.';
      } else if (!minLength(this.book?.abstract ?? '', 12)) {
        this.errors.abstract = 'The abstract must be at least 12 characters long.';
      } else {
        this.errors.abstract = '';
      }
    },
    validateAuthor() {
      if (!required(this.book?.author ?? '')) {
        this.errors.author = 'Author is required.';
      } else {
        this.errors.author = '';
      }
    },
  },
  created() {
    this.init(this.$route.params.isbn as string);
  },
  beforeRouteUpdate(to) {
    this.init(to.params.isbn as string);
  },
});
</script>

<style lang="scss" scoped>
label {
  margin-right: 5px;
}

span {
  display: block;
}

.is-invalid {
  border: 1px solid red;
  color: red;
}
</style>
