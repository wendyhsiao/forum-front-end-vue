import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import NotFound from '../views/NotFound.vue'
import Restaurants from '../views/Restaurants.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurants/feeds',
    name: 'restaurants-feeds',
    component: () => import('../views/RestaurantsFeeds.vue')
  },
  {
    path: '/restaurants/top',
    name: 'restaurants-tops',
    component: () => import('../views/RestaurantsTop.vue')
  },
  {
    path: '/restaurants/:id/dashboard',
    name: 'restaurant-dashboard',
    component: () => import('../views/RestaurantDashboard.vue')
  },
  {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('../views/Restaurant.vue')
  },
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UsersTop.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/restaurants'
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('../views/AdminRestaurants.vue')
  },
  {
    path: '/admin/restaurants/new',
    name: 'admin-restaurant-new',
    component: () => import('../views/AdminRestaurantNew.vue')
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue')
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('../views/AdminRestaurantEdit.vue')
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => { // 監聽全域的「切換路由」事件
  // 從 localStorage 取出 token
  const tokenInLocalStorage = window.localStorage.getItem('token')
  const tokenInStore = store.state.token

  let isAuthenticated = store.state.isAuthenticated

  // 確認有 token，且比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    // 取得驗證成功與否
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-in', 'sign-up']

  // 如果 token 無效且進入需要驗證的頁面則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  // 如果 token 有效且進入不需要驗證到頁面則轉址到餐聽首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/restaurants')
    return
  }

  next()
})

export default router
