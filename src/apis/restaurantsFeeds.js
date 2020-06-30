import { apiHelper } from '../utils/helpers.js'

export default {
  getRestaurantsFeeds () {
    return apiHelper.get('/restaurants/feeds')
  }
}
