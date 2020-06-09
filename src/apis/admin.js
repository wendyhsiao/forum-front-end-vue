import { apiHelper } from '../utils/helpers.js'
const getToken = () => window.localStorage.getItem('token')

export default {
  categories: {
    get () {
      return apiHelper.get('/admin/categories', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  },
  restaurants: {
    get () {
      return apiHelper.get('/admin/restaurants', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    create ({ formData }) {
      console.log('formData', formData)
      return apiHelper.post('/admin/restaurants', formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  }
}
