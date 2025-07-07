<script setup>
import { postService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import { Pop } from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';



async function submitPost() {
  try {
    await postService.createPost(editablePostData.value)

    editablePostData.value = {
      body: '',
      imgUrl: ''
    }
  } catch (error) {
    Pop.error(error);
    logger.error('FAILED TO CREATE POST')
  }
}


const editablePostData = ref({
  body: '',
  imgUrl: "",
})

</script>

<template>
  <form @submit.prevent="submitPost()">
    <div class="form-floating-mb-3">
      <input v-model="editablePostData.body" type="text" class="form-control" id="post-body"
        placeholder="Type your Post here..." required maxlength="500">
    </div>
    <div class="form-floating-mb-3">
      <!-- REVIEW this should not be required -->
      <input v-model="editablePostData.imgUrl" type="url" class="form-control" id="post-img"
        placeholder="Post Image...">
    </div>
    <div class="d-flex justify-content-end gap-3">
      <button class="btn btn-outline-dark" type="button" data-bs-dismiss="modal" aria-label="Close">Close</button>
      <button class="btn btn-success" type="submit">
        Submit
      </button>
    </div>
  </form>
</template>