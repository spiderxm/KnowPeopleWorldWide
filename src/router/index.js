import Vue from 'vue'
import Router from 'vue-router'
import Gmap from '@/components/Home/Gmap'
import signup from '@/components/auth/Signup'
import login from '@/components/auth/Login'
import firebase from 'firebase'
import profile from '@/components/Profiles/Viewprofile'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Gmap',
      component: Gmap,
      meta:{
        requiresAuth:true,
      }
      
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: profile,
      meta:{
        requiresAuth:true
      }
    }
  ]
})


router.beforeEach((to,from,next) => {
 if(to.matched.some(rec => rec.meta.requiresAuth)){
   //check auth state 
   let user = firebase.auth().currentUser
   if(user){
    next()
   }
   else{
     next({ name:'login' });
   }

 }
 else{
   next();
 }
})

export default router;



