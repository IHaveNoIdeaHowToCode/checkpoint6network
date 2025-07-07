<script setup>
import { AppState } from '@/AppState.js';
import PageNav from '@/components/PageNav.vue';
import PostCard from '@/components/PostCard.vue';
import PostModal from '@/components/PostModal.vue';
// import { Posts } from '@/models/Posts.js';
import { postService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted, computed } from 'vue';



const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)


onMounted(getPosts)


async function getPosts() {
  try {
    await postService.getPosts()
  }
  catch (error) {
    Pop.error(error);
    logger.error('FAILED TO HOME PAGE DEM POSTS')
  }
}

</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-12 mb-3">
        <div class="d-flex justify-content-center align-items-center gap-3">
          <h1>Welcome to CodeWorksPosts!</h1>
          <!-- TODO FIND OUT WHERE THE DARK/LIGHT MODE TEXT CHANGER IS AT AND APPLY IT TO THIS BUTTON -->
          <button v-if="account" type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#postFormModal">Create New Post <span
              class="mdi mdi-pencil-plus-outline"></span></button>
          <small v-else>Login to write new Posts!</small>
          <PageNav />
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-md-4 mb-3 gap-2">
        <PostCard :postProp="post" />
      </div>
    </div>
  </section>
<PostModal />
</template>

<style scoped lang="scss"></style>
