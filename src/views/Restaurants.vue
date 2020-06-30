<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories"/>

    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- 餐廳卡片 RestaurantCard-->
        <RestaurantCard 
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant" />
      </div>

      <!-- 分頁標籤 RestaurantPagination -->
      <RestaurantPagination 
      v-if="totalPage.length > 1"
      :category-id="categoryId"
      :current-page="currentPage"
      :total-page="totalPage"
      :previous-page="previousPage"
      :next-page="nextPage"
      />

      <div v-if="restaurants.length < 1">
        此類別無餐廳，請看看其他分類~
      </div>
    </template>  
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import RestaurantsNavPills from "../components/RestaurantsNavPills.vue"
import RestaurantPagination from "../components/RestaurantPagination.vue"
import Spinner from '../components/Spinner.vue'
import restaurantsAPI from '../apis/restaurants.js'
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantPagination,
    Spinner
  },
  data() {
    return {
      restaurants: [ ],
      categories: [ ],
      categoryId: -1,
      currentPage: 1,
      totalPage: [ ],
      previousPage: -1,
      nextPage: -1,
      isLoading: true
    }
  },
  created() {
    const {page = '', categoryId = ''} = this.$route.query
    this.fetchRestaurants({
      queryPage: page,
      queryCategoryId: categoryId
    })
  },
  beforeRouteUpdate (to, from, next) {
    const {page = '', categoryId = ''} = to.query
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
    next()
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {

        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId
        })

        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next
        } = response.data

        this.restaurants = restaurants
        this.categories = categories
        this.categoryId = categoryId
        this.currentPage = page
        this.totalPage = totalPage
        this.previousPage = prev
        this.nextPage = next
        this.isLoading = false

      } catch (error) {
        this.isLoading = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  }
};
</script>>