<template>
  <div id="app">
 <Navbar />
 <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Layouts/Navbar'
export default {
  name: 'App',
  components:{
    Navbar
  }
}
</script>

<style>

</style>
