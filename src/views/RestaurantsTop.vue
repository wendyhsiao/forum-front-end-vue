<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">
        人氣餐廳
      </h1>

      <hr>
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="card mb-3"
        style="max-width: 540px;margin: auto;"
      >
        <div class="row no-gutters">
          <div class="col-md-4">
            <router-link :to="{name: 'restaurant', params: {id: restaurant.id}}">
              <img
                class="card-img"
                :src="restaurant.image"
              >
            </router-link>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                {{restaurant.name}}
              </h5>
              <span class="badge badge-secondary">收藏數：{{restaurant.FavoriteCount}}</span>
              <p class="card-text">
                {{restaurant.description}}
              </p>
              <router-link
                :to="{name: 'restaurant', params: {id: restaurant.id}}"
                class="btn btn-primary mr-2"
              >Show</router-link>

              <button
                v-if="restaurant.isFavorited"
                type="button"
                class="btn btn-danger mr-2"
                @click.stop.prevent="deleteFavorite(restaurant.id)"
              >
                移除最愛
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary"
                @click.stop.prevent="addFavorite(restaurant.id)"
              >
                加到最愛
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>  
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import restaurantAPI from '../apis/restaurants.js'
import Spinner from '../components/Spinner.vue'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    NavTabs,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      isLoading: true
    }
  },
  created() {
    this.fetchRestaurantsTop()
  },
  methods: {
    async fetchRestaurantsTop() {
      try {
        const {data} = await restaurantAPI.getTopRestaurants()

        this.restaurants = data.restaurants
        this.isLoading = false

      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得人氣餐廳，請稍後再試'
        })
        console.log('error', error)
      }
    },
    async addFavorite(restaurantId) {
      try {

        const {data} = await usersAPI.addFavorite(restaurantId)

        console.log('data', data)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurants = this.restaurants.map(restaurant => {
          if (restaurant.id !== restaurantId) {
            return restaurant
          } else {
            return {
              ...restaurant,
              isFavorited: true,
              FavoriteCount: restaurant.FavoriteCount + 1
            }
          }
        })

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
    async deleteFavorite(restaurantId) {
      try {

        const {data} = await usersAPI.deleteFavorite(restaurantId)

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurants = this.restaurants.map(restaurant => {
          if (restaurant.id !== restaurantId) {
            return restaurant
          } else {
            return {
              ...restaurant,
              isFavorited: false,
              FavoriteCount: restaurant.FavoriteCount - 1
            }
          }
        })

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳移除最愛，請稍後再試'
        })
        console.log('error', error)
      }
    }
  }
};
</script>