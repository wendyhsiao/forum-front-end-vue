<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- UserProfileCard -->
      <UserProfileCard 
        :user="user" 
        :initial-is-followed="isFollowed"
        :is-current-user="currentUser.id === user.id"
      />
      <div class="row">
        <div class="col-md-4">
          <!-- UserFollowingsCard -->
          <UserFollowingsCard :followings="followings" />
          <!-- UserFollowersCard.vue -->
          <UserFollowersCard :followers="followers" />
        </div>

        <div class="col-md-8">
          <!-- UserCommentsCard.vue -->
          <UserCommentsCard :comments="comments" />
          <!-- UserFavoritedRestaurantsCard.vue -->
          <UserFavoritedRestaurantsCard :favoritedRestaurants="favoritedRestaurants" />
        </div>
      </div>
    </template>  
  </div>
</template>

<script>
import UserProfileCard from '../components/UserProfileCard.vue'
import UserFollowingsCard from '../components/UserFollowingsCard.vue'
import UserFollowersCard from '../components/UserFollowersCard.vue'
import UserCommentsCard from '../components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from '../components/UserFavoritedRestaurantsCard.vue'
import Spinner from '../components/Spinner.vue'
import usersAPI from '../apis/users.js'
import {Toast} from '../utils/helpers.js'
import { mapState } from 'vuex'

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
    Spinner
  },
  data() {
    return {
      user: {
        id: -1,
        name: '',
        email: '',
        image: '',
        commentsLength: 0,
        favoritedRestaurantsLength: 0,
        followersLength: 0,
        followingsLength: 0
      },
      isFollowed: false,
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const {id: userId} = this.$route.params
    this.fetchUser(userId)
  },
  beforeRouteUpdate(to, from, next) {
    const {id} = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    async fetchUser(userId) {
      try {

        const { data } = await usersAPI.get({userId})
        const {profile, isFollowed} = data

        const commentSet = new Set()
        this.comments = profile.Comments.filter( comment => 
          comment.Restaurant &&
          !commentSet.has(comment.Restaurant.id) &&
          commentSet.add(comment.Restaurant.id)
        )

        this.user = {
          ...this.user,
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          commentsLength: profile.Comments.length,
          favoritedRestaurantsLength: profile.FavoritedRestaurants.length,
          followersLength: profile.Followers.length,
          followingsLength: profile.Followings.length
        }
        this.isFollowed = isFollowed
        this.followings = profile.Followings
        this.followers = profile.Followers
        this.comments = profile.Comments
        this.favoritedRestaurants = profile. FavoritedRestaurants
        this.isLoading = false

      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
        console.log('error', error)
      }
    }
  }
}
</script>