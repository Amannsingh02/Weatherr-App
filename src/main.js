import Vue from 'vue'
import 'firebase/compat/firestore';
import App from './App.vue'
import router from './router'
//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore/lite';
import firebase from "firebase/compat/app";
//import firebase from 'firebase/app';


Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAnXgywUvzfq8CTe0UVY-Xy2acNvDEAtUU",
  authDomain: "appweather-dfaec.firebaseapp.com",
  projectId: "appweather-dfaec",
  storageBucket: "appweather-dfaec.appspot.com",
  messagingSenderId: "249869200204",
  appId: "1:249869200204:web:d7c24c054f842eefcc3de9"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();                 //for database, by using export it can be imported wherever needed


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
