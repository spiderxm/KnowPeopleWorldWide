<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>



</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name:'Gmap',
    data(){
        return{
            lat:0,
            lng:0

        }
    },
    methods:{
        renderMap(){

            const map = new google.maps.Map(document.getElementById('map'),{
                center: { lat : this.lat ,lng:this.lng },
                zoom: 5,
                maxZoom:15,
                minZoom:3,
                streetViewControl : false
            });
            db.collection('users').get().then(users=>{
                users.docs.forEach(doc =>{
                    let data = doc.data()
                    if(data.geolocation){
                        let marker = new google.maps.Marker({
                            position:{
                                lat:data.geolocation.lat,
                                lng:data.geolocation.lng
                            },
                            map:map,

                        })
                        //add click event to marker
                           //add click event to marker
                        marker.addListener('click',() => {
                            console.log(doc.id)
                            this.$router.push({name:'profile',params:{id:doc.id}});
                        })
                    }
                })
            })
        }
    },
    mounted(){
        let user = firebase.auth().currentUser
                //get user geolocation
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(pos =>{
                        this.lat = pos.coords.latitude;

                        this.lng = pos.coords.longitude;
                        //find the user record and then update geocords
                        db.collection('users').where('user_id','==',user.uid).get().then(Snapshot=>{
                           Snapshot.forEach( (doc) =>{
                               db.collection('users').doc(doc.id).update({
                                   geolocation:{
                                       lat : pos.coords.latitude,
                                       lng : pos.coords.longitude
                                   }
                               })
                           })
                            }).then (() => { this.renderMap() })
                        
                    },(err)=>
                    {console.log(err)
                    this.renderMap()
                    }
                    ,{maximumAge:6000,timeout:3000})
                }
                else{
                    this.renderMap();
                }
                

    }
}
</script>
<style>
.google-map{
    margin: 0 auto;
    height: 100%;
    width: 100%;
    top:0;
    background: white;
    z-index: -1;
    left: 0;
    position: absolute;

}
</style>