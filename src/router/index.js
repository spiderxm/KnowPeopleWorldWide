import Vue from 'vue'
import Router from 'vue-router'
import Gmap from '@/components/Home/Gmap'
import signup from '@/components/auth/Signup'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Gmap',
      component: Gmap
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    }
  ]
})
