import { apiHelper } from '../utils/helpers.js'
const getToken = () => window.localStorage.getItem('token')

export default {
  getRestaurantsFeeds () {
    return apiHelper.get('/restaurants/feeds', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
