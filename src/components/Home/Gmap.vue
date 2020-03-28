<template>
    <div class="map">
        <h2>Map</h2>

    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    name:'Gmap',
    data(){
        return{

        }
    },
    mounted(){
        console.log(firebase.auth().currentUser);
        
    }
}
</script>
<style>

</style>