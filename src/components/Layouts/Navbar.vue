<template>
    <div class="navbar">
        <nav class="black blacky darken-1">
            <div class="container">
                <router-link  :to="{'name':'Gmap'}" class="brand-logo left">
                    Know People Worldwide
                </router-link>
                <ul class="right">
                  <li>
                      <router-link v-if="!user" :to="{name:'signup'}">Signup</router-link>
                  </li>
                  <li>
                      <router-link v-if="!user" :to="{name:'login'}">Login</router-link>
                  </li>
                  <li v-if="user">
                    <a>{{user.email}}</a>
                  <li>
                      <a v-if="user" @click="logout">Logout</a>
                  </li>
                </ul>
            </div>
            </nav> 
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    name:'Navbar',
    data(){
        return {
          user:null
        }
    },
    methods:{
        logout(){
          firebase.auth().signOut().then(()=>{
              this.$router.push({'name':'login'})
          }).catch(err => console.log(err))
        }
    },
    created(){
      firebase.auth().onAuthStateChanged((user) => {
         if(user){
             this.user = user
         }
         else{ 
              this.user = null
         }
      })


    }
}
</script>  
<style >
.blacky{
    border-bottom-right-radius:40px;  
}
</style>