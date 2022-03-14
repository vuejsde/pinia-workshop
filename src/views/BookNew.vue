<template>
  <p v-if="success" class="message success">Successfully created new book.</p>

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
      <label for="isbn">Isbn</label>
      <input
        type="text"
        v-model="book.isbn"
        name="isbn"
        id="isbn"
        @change="validateIsbn"
        :class="{ 'is-invalid': !!errors.isbn }"
      />
      <span v-if="errors.isbn">{{ errors.isbn }}</span>
    </p>
    <p>
      <button type="submit" :disabled="isInvalid">Submit</button>
    </p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { Book } from '@/types';
import { required, minLength } from '@/utils/validations';
import { mapActions } from 'pinia';
import { useBookStore } from '@/stores/BookStore';

type ComponentData = {
  book: Partial<Book>;
  errors: {
    [P in keyof Partial<Book>]: string;
  };
  success: boolean;
};

export default defineComponent({
  name: 'BookNew',
  data(): ComponentData {
    return {
      book: {
        title: '',
        abstract: '',
        author: '',
        isbn: '',
      },
      errors: {
        title: '',
        abstract: '',
        author: '',
        isbn: '',
      },
      success: false,
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
    ...mapActions(useBookStore, ['create']),
    async submit() {
      this.success = false;

      await this.create(this.book);

      this.book = {
        title: '',
        abstract: '',
        author: '',
        isbn: '',
      };

      this.success = true;
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
    validateIsbn() {
      if (!required(this.book?.isbn ?? '')) {
        this.errors.isbn = 'Isbn is required.';
      } else if (!minLength(this.book?.isbn ?? '', 13)) {
        this.errors.isbn = 'The isbn must be at least 13 characters long.';
      } else {
        this.errors.isbn = '';
      }
    },
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
