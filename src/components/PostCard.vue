<script setup>
import { AppState } from '@/AppState.js';
import { Posts } from '@/models/Posts.js';
import { postService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';


const props = defineProps({
  postProp: { type: Posts, required: true }
})

const account = computed(() => AppState.account)

async function deletePost() {
  const confirmed = await Pop.confirm('Are you sure you want to delete this Post?')

  if (!confirmed) {
    return
  }

  try {
    await postService.deletePost(props.postProp.id)
  }
  catch (error) {
    Pop.error(error);
    logger.error('COULD NOT DELETE POST', error)
  }
}

</script>


<template>

  <div class="shadow rounded-top post-border">
    <img :src="postProp.imgUrl" :alt="`An image or GIF posted by ${postProp.creator.name}`" class="img-fluid post-img">
    <div class="p-3-bg-light">
      <div class="d-flex-justify-content-center-align-items-center-mb-3">
        <div>
          <p>{{ postProp.body }}</p>
          <p class="fs-5"> ♥: {{ postProp.likes.length }}</p>
          <time :datetime="postProp.createdAt.toLocaleString()">{{ postProp.createdAt.toLocaleString() }}</time>
        </div>
      </div>
      <div>
        <span>{{ postProp.creator.name }}</span>
        <img :src="postProp.creator.picture" :alt="postProp.creator.name" class="creator-img">
        <button @click="deletePost()" v-if="account?.id == postProp.creator.id" class="btn btn-outline-danger"
          title="Delete car" type="button">
          <span class="mdi mdi-delete"></span>
        </button>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.post-img {
  width: 100%;
  height: 40dvh;
  object-fit: cover;
}

.creator-img {
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  margin: 15px;
}

.post-border {
  border-style: double;
  border-width: thick;
  border-color: black;
  overflow-y: hidden;
}
</style>