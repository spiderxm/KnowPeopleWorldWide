<template>
    <div class="view-profile container blacky">
       <div v-if="profile" class="card">
           <h2 class="black-text center">{{profile.alias}}'s Wall</h2>
           <ul class="comments collection">
               <li v-for="(comment,index) in comments" :key="index">
                   <div class="black-text">{{comment.from}}</div>
                   <div class="grey-text text-darken-2">{{comment.content}}</div>
               </li>
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
            user :null,
            comments: []
        }
    },
    methods:{
        addcomments(){
          if(this.newcomment){
              this.feedback = null
              db.collection('comments').add({
                  to : this.$route.params.id,
                  from : this.user.alias,
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
        //comments
        db.collection('comments').where('to','==',this.$route.params.id)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type == "added"){
                   this.comments.unshift({
                  from : change.doc.data().from,
                  content :  change.doc.data().content,
                   })
                }
            })
        })

        //profile data
        ref.doc(this.$route.params.id).get()
        .then(user => {
            this.profile = user.data()
        })


    }
}


</script>

<style scoped>
.view-profile .card{
    padding:20px;
    margin-top :60px;

}
.view-profile h2{
    font-size: 2em;
    margin-top:0;
}
.view-profile li{
    padding: 10px;
    border-bottom: 1px solid #eee;
}
.card{
    border-radius: 40px;
}
.comments{
        border-radius: 40px;

}
</style>