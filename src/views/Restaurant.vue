<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments 
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment" />
    <!-- 新增評論 CreateComment -->
    <CreateComment 
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment" />
  </div>
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail.vue'
import RestaurantComments from '../components/RestaurantComments.vue'
import CreateComment from '../components/CreateComment.vue'
import restaurantAPI from '../apis/restaurants.js'
import {Toast} from '../utils/helpers.js'
import { mapState } from 'vuex'

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        tel: '',
        address: '',
        openingHours: '',
        description: '',
        image: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const {id: restaurantId} = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchRestaurant(to.params.id)
    next()
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        
        const {data} = await restaurantAPI.getRestaurant({restaurantId})

        const {restaurant, isFavorited, isLiked} = data

        this.restaurant = {
          id: restaurant.id,
          name: restaurant.name,
          categoryName: restaurant.Category.name,
          tel: restaurant.tel,
          address: restaurant.address,
          openingHours: restaurant.opening_hours,
          description: restaurant.description,
          image: restaurant.image,
          isFavorited,
          isLiked
        },
        this.restaurantComments = restaurant.Comments
      
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
        console.log('error', error)
      }
    },
    afterDeleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(
        comment => comment.id !== commentId
      )
    },
    afterCreateComment(payload) {
      const {commentId, restaurantId, text} = payload
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name  
        },
        text,
        createdAt: new Date()
      })
    }
  }
};
</script>