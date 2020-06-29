import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      state.token = window.localStorage.getItem('token')
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      window.localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data, statusText } = await usersAPI.getCurrentUser()
        const { id, name, email, image, isAdmin } = data

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })
        return true
      } catch (error) {
        console.log('error', error)
        console.log('can not fetch user information')
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
