<template>
  <div class="card mb-3">
    <div class="card-header">
      <strong>{{favoritedRestaurants.length}}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <router-link 
        v-for="favoritedRestaurant in favoritedRestaurants"
        :key="favoritedRestaurant.id"
        :to="{name: 'restaurant', params: {id: favoritedRestaurant.id}}"
      >
        <img 
          :src="favoritedRestaurant.image"
          width="60px"
          height="60px"
          class="mr-1 mb-1"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    favoritedRestaurants: {
      type: Array,
      required: true
    }
  }
}
</script>