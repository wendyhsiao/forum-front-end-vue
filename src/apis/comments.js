import { apiHelper } from '../utils/helpers.js'
const getToken = () => window.localStorage.getItem('token')

export default {
  create ({ restaurantId, text }) {
    return apiHelper.post('/comments', { restaurantId, text }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  delete ({ commentId }) {
    return apiHelper.delete(`/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
