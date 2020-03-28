<template>
    <div class="navbar">
        <nav class="black darken-1">
            <div class="container">
                <a href="" class="brand-logo left">
                    Know People Worldwide
                </a>
                <ul class="right">
                  <li>
                      <router-link :to="{name:'signup'}">Signup</router-link>
                  </li>
                  <li>
                      <router-link href="">Login</router-link>
                  </li>
                     <li>
                      <router-link href="">Logout</router-link>
                  </li>
                </ul>
            </div>
            </nav> 
    </div>
</template>
<script>
export default {
    name:'Navbar',
    data(){
        return {

        }
    }
}
</script>  
<style>

</style>