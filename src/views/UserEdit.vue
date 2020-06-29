<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          class="form-control w-25"
          placeholder="Enter Name"
          required
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img 
          v-if="image"
          :src="image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        >
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isProcessing"
      >
        {{isProcessing ? '資料更新中...' : 'Submit'}}
      </button>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import usersAPI from '../apis/users.js'
import {Toast} from '../utils/helpers.js'

export default {
  data() {
    return {
        id: -1,
        name: '',
        image: '',
        isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser(user) {
      if (user.id === -1) return
      const {id} = this.$route.params
      this.setUser(id)
    }
  },
  created() {
    if (this.currentUser.id === -1) return
    const {id} = this.$route.params
    this.setUser(id)
  },
  methods: {
    setUser(userId) {

      const {id, name, image} = this.currentUser

      if (userId.toString() !== id.toString()) {
        this.$router.push({path: 'not-found'})
        return
      }

      this.id = id
      this.name = name
      this.image = image
    },
    handleFileChange(e) {
      const {files} = e.target

      if (files === 0) {
        this.image = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.image = imageURL
      }
    },
    async handleSubmit(e) {
      try {
        if (!this.name) {
          Toast.fire({
            icon: 'warning',
            title: '姓名不可空白'
          })
          return
        }

        const form = e.target
        const formData = new FormData(form)

        this.isProcessing = true
        const {data} = await usersAPI.update({
          userId: this.id,
          formData
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.$router.push({name: 'user', params: {id: this.id}})
       
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
        console.log('error', error)
      }
    }
  }
}
</script>