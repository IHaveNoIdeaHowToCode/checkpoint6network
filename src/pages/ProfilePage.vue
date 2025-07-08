<!-- TODO BUILD PAGE -->


<script setup>
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';
import { logger } from '@/utils/Logger.js';
import { computed } from 'vue';
import { AppState } from '@/AppState.js';
import { useRoute } from 'vue-router';
import { postService } from '@/services/PostsService.js';
import PostCard from '@/components/PostCard.vue';
import { profilesService } from '@/services/ProfileService';

const profile = computed(() => AppState.profile)
const profilePosts = computed(() => AppState.posts)

const route = useRoute()

onMounted(() => {
  getProfileById()
  getProfileProjectsByProfileId()
})

async function getProfileById() {
  try {
    console.log('GOT ROUTE', route, route.params.profileId)
    const profileIdFromRouteParams = route.params.profileId
    await profilesService.getProfileById(profileIdFromRouteParams)
  } catch (error) {
    logger.error(error)
    Pop.error(error, 'Could not get profile', `<img src="https://http.cat/images/${error.response.status}.jpg">`)
  }
}

async function getProfileProjectsByProfileId() {
  try {
    const profileIdFromRouteParams = route.params.profileId
    await postService.getPostsByProfileId(profileIdFromRouteParams)
  } catch (error) {
    logger.error(error)
    Pop.error(error, 'Could not get profile posts')
  }
}

</script>


<template>
  <div class="container">
    <section v-if="profile" class="row justify-content-center profile">
      <img :src="profile.coverImg" alt="">
      <div class="col-8">
        <img :src="profile.picture" alt="">
        <h2 class="text-center">{{ profile.name }}</h2>
        <hr />
        <p>{{ profile.bio }}</p>
      </div>
    </section>
   
    <section class="mx-2 mx-md-5 post-cards">
      <ProjectCard v-for="post in profilePosts" :post :key="`profile-post-${post.id}`" />
    </section>
  </div>
</template>


<style lang="scss" scoped>
.profile {
  text-align: center;

  img {
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: -75px;

  }

  div img {
    height: 150px;
    width: 150px;
    margin-bottom: .5em;
  }

  p {
    text-align: left;
    // background-color: rgba(var(--bs-dark-rgb), 5);
    border-radius: 8px;
    padding: 2em;
    border: 1px solid var(--bs-border);
    
  }
}
</style>


