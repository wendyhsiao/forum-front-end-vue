<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image | emptyImage" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{user.name}}</h5>
          <p class="card-text">{{user.email}}</p>

          <ul class="list-unstyled">
            <li>
              <strong>{{user.commentsLength}}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{user.favoritedRestaurantsLength}}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{user.followingsLength}}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{user.followersLength}}</strong> followers (追隨者)
            </li>
          </ul>

          <router-link 
            v-if="isCurrentUser"
            :to="{name: 'user-edit', params: {id: user.id}}"
            class="btn btn-primary">Edit
          </router-link>
          
          <template v-else>
            <button
              v-if="isFollowed"
              type="button"
              class="btn btn-danger btn-border favorite mr-2"
              @click.stop.prevent="deleteFollowing(user.id)"
            >取消追蹤</button>
            <button
              v-else
              type="button"
              class="btn btn-primary btn-border favorite mr-2"
              @click.stop.prevent="addFollowing(user.id)"
            >追蹤</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {emptyImageFilter} from '../utils/mixins.js'
import usersAPI from '../apis/users.js'
import {Toast} from '../utils/helpers.js'

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    },
    isCurrentUser: {
      type: Boolean,
      required: true
    }
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      // user: this.initialUser
      isFollowed: this.initialIsFollowed
    };
  },
  watch: {
    initialIsFollowed(isFollowed) {
      this.isFollowed = isFollowed
    }
  },
  methods: {
    async addFollowing(userId) {
      try {
        const {data} = await usersAPI.addFollowing(userId)

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.isFollowed = true

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
        console.log('error', error)
      }
    },
    async deleteFollowing(userId) {
      try {
        const {data} = await usersAPI.deleteFollowing(userId)
        
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.isFollowed = false

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤，請稍後再試'
        })
        console.log('error', error)
      }
    }
  }
};
</script>