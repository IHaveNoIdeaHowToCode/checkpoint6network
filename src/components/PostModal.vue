<script setup>
import PostForm from './PostForm.vue';

</script>


<template>
  <div class="modal fade" id="postFormModal" tabindex="-1" aria-labelledby="postFormModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="carFormModalLabel">Create a Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <PostForm />
        </div>
      </div>
    </div>
  </div>
</template>