<script setup>
import { postService } from '@/services/PostsService';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

async function searchPosts() {
  logger.log('searching for ' + editableSearchTerm.value)
  try {
    await postService.searchPosts(editableSearchTerm.value)
    editableSearchTerm.value = ''
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT SEARCH POSTS', error)
  }
}

const editableSearchTerm = ref('')
</script>


<template>
  <form @submit.prevent="searchPosts()">
    <div class="input-group mb-3">
      <input v-model="editableSearchTerm" type="text" class="form-control" placeholder="Funny Cat Posts..."
        aria-label="Enter a search term" aria-describedby="search-button">
      <button class="btn btn-outline-primary" type="submit" id="search-button">
        Search <span class="mdi mdi-magnify"></span>
      </button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>