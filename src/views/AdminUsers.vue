<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th
            scope="col"
            width="140"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="user in users"
          :key="user.id">
          <th scope="row">
            {{user.id}}
          </th>
          <td>{{user.email}}</td>
          <td v-if="user.isAdmin">admin</td>
          <td v-else>user</td>
          <td v-if="currentUser.id !== user.id">
            <button
              v-if="user.isAdmin"
              type="button"
              class="btn btn-link"
              @click.stop.prevent="toggleUserRole(user.id)"
            >
              set as user
            </button>
            <button
              v-else
              type="button"
              class="btn btn-link"
              @click.stop.prevent="toggleUserRole(user.id)"
            >
              set as admin
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue'
import adminAPI from '../apis/admin.js'
import {Toast} from '../utils/helpers.js'
import {mapState} from 'vuex'

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      users: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        const {data} = await adminAPI.users.get()
        this.users = data.users

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得會員資料，請稍後再試'
        })
        console.log('error', error)
      }
    },
    toggleUserRole(userId) {
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: !user.isAdmin
          }
        }
        return user
      })
    }
  }
}
</script>