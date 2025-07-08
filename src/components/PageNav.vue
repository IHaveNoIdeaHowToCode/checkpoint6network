<script setup>
import { AppState } from '@/AppState.js';
import { postService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import { Pop } from '@/utils/Pop';
import { computed } from 'vue';



const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

async function changePage(pageNumber) {
  logger.log('going to page' + pageNumber)
  try {
    const searchTerm = AppState.searchTerm
    if (!searchTerm) {
      await postService.changePostPage(pageNumber)
    }
    else {
    await postService.changeSearchPage(searchTerm, pageNumber)
    }
  } catch (error) {
    logger.error('COULD NOT CHANGE PAGE', error)
    Pop.error(error)
  }
}


</script>



<!-- REVIEW FIX PAGE NAV, STUCK ON 0 of 0 PAGES -->
<template>
<div class="di-flex-align-items-center-gap-3">
  <button @click="changePage(currentPage -1)" class="btn btn-primary" type="button" :disabled="currentPage ==1">
    Previous
  </button>
  <span>Page {{ currentPage }} of {{ totalPages }}</span>
  <button @click="changePage(currentPage + 1)" class="btn btn-primary" type="button" :disabled="currentPage == totalPages || currentPage == 14">
    Next
  </button>
</div>



</template>


<style lang="scss" scoped></style>