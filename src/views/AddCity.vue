<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="grid">
    <div class="city-link" v-for="(city, index) in cities" v-bind:key="index"> 
      <City v-bind:city="city" v-bind:edit="edit" /> 
    </div>
  </div>
</template>

<script>
import City from "../components/City"



export default {
  name: "AddCity",
  props: ["cities", "edit"],
  created() {
    //console.log(this.cities);
  },
  components: {
    City,
  },
};
</script>

<style lang="scss" scoped>              //using scoped will make sure it will not work for any other components and only specific one
.grid {
  display: grid;
  padding-top: 81px;
  background-color: #31363d;
  width: 100%;
  min-height: 100vh;
  grid-auto-rows: 250px;

  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>