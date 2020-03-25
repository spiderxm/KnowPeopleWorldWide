import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBZm6Kat5-1HOEdv5YFqoxVbytOaUEDEHg",
    authDomain: "know-your-users.firebaseapp.com",
    databaseURL: "https://know-your-users.firebaseio.com",
    projectId: "know-your-users",
    storageBucket: "know-your-users.appspot.com",
    messagingSenderId: "119083575290",
    appId: "1:119083575290:web:2edab0cdf679ebbd48a643",
    measurementId: "G-CP56WXF9LG"
  };
  // Initialize Firebase
  const firebaseapp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebaseapp.firestore()