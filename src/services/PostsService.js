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
      // TODO save page information from response data to your appstate
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
    // FIXME unshift instead of pushing
    AppState.posts.push(post)

  }

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('DELETE POST', response.data)
    // REVIEW splice the post you just deleted out of the appstate (gregslist)
    const posts = AppState.posts
    const postIndex = posts.findIndex(post => post.id == postId)
    posts.splice(postIndex, 1)
  }

  async changePostPage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log('CHANGE PAGE', response.data)
    // TODO save posts AND page information to appstate (vueflix)
  }
}

export const postService = new PostsService()