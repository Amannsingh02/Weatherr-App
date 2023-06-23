<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" v-bind:APIkey="APIkey"/>
    <Navigation  v-on:add-city="toggleModal" v-on:edit-city="toggleEdit" />
   <router-view v-bind:cities="cities" v-bind:edit="edit" />
  </div>
</template>

<script>
import axios from "axios";                   //for HTTP req to openweatherMap API
import db from "./main"
import Navigation from "./components/Navigation.vue"
import Modal from "./components/Modal.vue"
export default {
  name: "App",
  components: {
    Navigation,
    Modal,
  },
  data() {
    return {
      APIkey: "3a7c14f0fa98e20d90d9b15400e53744",
      cities: [],
      modalOpen: null,
      edit: null,
    };
  },
  created() {                         //call the functions
    this.getCityWeather();
    console.log(this.cities)
    //this.getCurrentWeather();
  },
  methods: {
    getCityWeather() {
      let firebaseDb = db.collection('cities');           //refernce to ctites data

      firebaseDb.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {        //will iterate over the changes
          if (doc.type === "added" && !doc.doc.Nd) {
              try{
                const response = await axios.get(
               `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=imperial&appid=${this.APIkey}`
                 );  //unit imperial for fahrenheit, 
        const data = response.data;
        firebaseDb.doc(doc.doc.id).update({
          currentWeather: data,
        })
        .then( () => {
          this.cities.push(doc.doc.data());               //will add the data to 'cities' array
        })
        .then( () => {
          //console.log(this.cities)
          //console.log(this.city)
        });
              
      } catch(err){
                  console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if(doc.type === 'removed') {
            this.cities = this.cities.filter(city => city.city != doc.doc.data().city);        //for filtering/deleting cities
          }
        });
      });
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
  },
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-display: "Quicksand", sans-serif;
}

.main {
  max-width: 1270px;
  margin: 0 auto;
  height: 100vh;

  .container {
    padding: 0 20px;
  }
}
</style>
