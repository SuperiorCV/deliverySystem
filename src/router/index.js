import Vue from 'vue'
import Router from 'vue-router'
import Dishes from '@/components/Dishes.vue'
// import Welcome from '@/components/Welcome.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Dishes',
      name: 'Dishes',
      component: Dishes
    }
  ]
})
