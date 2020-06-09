<template>
 <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm 
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue'
import adminAPI from '../apis/admin.js'
import {Toast} from '../utils/helpers.js'

export default {
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {

        this.isProcessing = true
        const {data} = await adminAPI.restaurants.create({formData})
        console.log('AdminRestaurantNew data',data)
        this.$router.push({ name: 'admin-restaurants '})

      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: ''
        })
        console.log('error', error)
      }
    }
  }
}
</script>