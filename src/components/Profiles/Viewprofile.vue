<template>
    <div class="vue-profile container">
       <div v-if="profile" class="card">
           <h2 class="black-text center">{{profile.alias}}'s Wall</h2>
           <ul class="comments collection">
               <li>comment</li>
           </ul>
           <form @submit.prevent="addcomments">
               <div class="field">
                   <label for="comment">Add a comment</label>
                   <input type="text" name="comment" v-model="newcomment">
                   <p class="red-text center" v-if="feedback"></p>
               </div>
           </form>
       </div>
    </div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    data(){
        return {
            profile: null,
            feedback:null,
            newcomment:null,
            user :null
        }
    },
    methods:{
        addcomments(){
          if(this.newcomment){
              this.feedback = null
              db.collection('comments').add({
                  to : this.$route.params.id,
                  from : this.user.id,
                  content : this.newcomment,
                  time: Date.now()
              }).then(()=>{
                  this.newcomment = null
              })
          }
          else{
              this.feedback = "you must enter a comment to add it";
          }
        }
    },
    created(){
        let ref = db.collection('users');
        console.log(firebase.auth().currentUser.uid)
        //get current user
        ref.where('user_id','==',firebase.auth().currentUser.uid).get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.user = doc.data()
                    this.user.id = doc.id
                })
            }
        );
        ref.doc(this.$route.params.id).get()
        .then(user => {
            this.profile = user.data()
        })
    }
}


</script>