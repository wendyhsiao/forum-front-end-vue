import { apiHelper } from '../utils/helpers.js'

export default {
  getRestaurant ({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  getRestaurants ({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  getTopRestaurants () {
    return apiHelper.get('/restaurants/top')
  }
}
