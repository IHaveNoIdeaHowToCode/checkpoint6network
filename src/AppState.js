import { reactive } from 'vue'
import { Profile } from './models/Profile.js'


// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Posts.js').Posts[]} Posts from the database*/
  posts: [],
  currentPage: 1,
  totalPages: 0,
  searchTerm: '',
  /** @type {Profile} */
  profile: null,

})

