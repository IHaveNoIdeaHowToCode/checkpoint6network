import { logger } from "@/utils/Logger.js";
import { Pop } from "@/utils/Pop.js";
import { api } from "./AxiosService.js";
import { Posts } from "@/models/Posts.js";
import { AppState } from "@/AppState.js";




class PostsService {
  async getPosts() {
    try {
      const response = await api.get('api/posts')
      logger.log('GOT DEM POSTS BOIIIIII', response.data)
      const posts = response.data.posts.map(pojo => new Posts(pojo))
      AppState.posts = posts
      // REVIEW save page information from response data to your appstate
      this.handlePostResponse(response)
    }
    catch (error) {
      Pop.error(error);
      logger.error('FAILED TO GET DEM POSTS')
    }
  }

  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    logger.log('CREATED POST', response.data)
    const post = new Posts(response.data)
    // REVIEW unshift instead of pushing
    AppState.posts.unshift(post)
  }

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('DELETE POST', response.data)
    // REVIEW splice the post you just deleted out of the appstate (gregslist)
    const posts = AppState.posts
    const postIndex = posts.findIndex(post => post.id == postId)
    posts.splice(postIndex, 1)
  }

  async searchPosts(searchTerm) {
    const response = await api.get(`api/posts?${searchTerm}`)
    logger.log('SEARCHED POSTS', response.data)
    AppState.searchTerm = searchTerm
    this.handlePostResponse(response)
  }

  async changePostPage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log('CHANGE PAGE', response.data)
    // REVIEW save posts AND page information to appstate (vueflix)
    this.handlePostResponse(response)
  }

  async changeSearchPage(searchTerm, pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}&query=${searchTerm}`)
    logger.log('CHANGED PAGE', response.data)
    this.handlePostResponse(response)
  }

  async getPostsByProfileId(profileId) {
    AppState.posts = []
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('GOT THIS GUYS POST', response.data)
    const profilePosts = response.data.posts.map(pojo => new Posts(pojo))
    AppState.posts = profilePosts
  }

  handlePostResponse(response) {
    const posts = response.data.posts.map(pojo => new Posts(pojo))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }
}

export const postService = new PostsService()