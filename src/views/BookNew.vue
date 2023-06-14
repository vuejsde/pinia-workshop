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
import { defineComponent, ref, computed } from 'vue';

import type { Book } from '@/types';
import { required, minLength } from '@/utils/validations';
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
  setup() {
    const bookStore = useBookStore();
    const book = ref<ComponentData['book']>({
      title: '',
      abstract: '',
      author: '',
      isbn: '',
    });

    const errors = ref({
      title: '',
      abstract: '',
      author: '',
      isbn: '',
    });
    const success = ref(false);

    const isInvalid = computed(() => {
      return Object.keys(errors.value).some(
        (val) => errors.value[val as keyof ComponentData['errors']] !== '',
      );
    });

    async function submit() {
      success.value = false;

      bookStore.create(book.value);

      book.value = {
        title: '',
        abstract: '',
        author: '',
        isbn: '',
      };

      success.value = true;
    }

    function validateTitle() {
      if (!required(book.value?.title ?? '')) {
        errors.value.title = 'Title is required.';
      } else if (!minLength(book.value?.title ?? '', 5)) {
        errors.value.title = 'The title must be at least 5 characters long.';
      } else {
        errors.value.title = '';
      }
    }

    function validateAbstract() {
      if (!required(book.value?.abstract ?? '')) {
        errors.value.abstract = 'Abstract is required.';
      } else if (!minLength(book.value?.abstract ?? '', 12)) {
        errors.value.abstract = 'The abstract must be at least 12 characters long.';
      } else {
        errors.value.abstract = '';
      }
    }

    function validateAuthor() {
      if (!required(book.value?.author ?? '')) {
        errors.value.author = 'Author is required.';
      } else {
        errors.value.author = '';
      }
    }

    function validateIsbn() {
      if (!required(book.value?.isbn ?? '')) {
        errors.value.isbn = 'Isbn is required.';
      } else if (!minLength(book.value?.isbn ?? '', 13)) {
        errors.value.isbn = 'The isbn must be at least 13 characters long.';
      } else {
        errors.value.isbn = '';
      }
    }

    return {
      bookStore,
      book,
      errors,
      success,
      isInvalid,
      validateTitle,
      validateAbstract,
      validateAuthor,
      validateIsbn,
      submit,
    };
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
