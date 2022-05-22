<template>
  <body>
      <div class="container">
    <form class="form-inline">
      <input class="form-control mr-sm-2" style="width:200px" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>

  <div>
      {{ entities }}
    <div v-for="entity in entities" :key="entity.nom">
      {{ entity.nom }}
    </div>
  </div>
  </body>
</template>

<script>
import { defineComponent } from "vue";

import { entityStore } from "@/stores/entity";
import { storeToRefs } from "pinia";

import axios from "axios";
import { environment } from '../../environment/environment';


export default defineComponent({
  name: "HomeView",
  components: {
  },

 setup() {
    const sEntity = entityStore();
    const { getEntities } = storeToRefs(sEntity);
    const { getEntitiesByFilters } = sEntity;

    return { getEntities, getEntitiesByFilters };
  },

  data() {
    return {
      entities: []
    };
  },

  // async onMounted(() => {
 
  //     this.entities =  await this.getEntitiesByFilters();
  //   console.log(this.entities);
  //   // this.updateEntities();
  //   // this.entities = this.entities
  // )},


  created() {
    this.getEntitiesByFilters();
    // this.$watch(this.entities, 
    // await this.fetchEntities().then(data => {
    //   console.log(data);
    //   this.entities = data;
    //   this.$nextTick(() => this.fetchEntities());
    // });
  },


  async mounted() {
    const data = await axios.get(environment.WEP_API_URL+ "/communes")
      .then(function (response) {
        // handle success
        console.log(response?.data?.body?.communes.length);
        // return response?.data?.body?.communes.length;
        let data = "dfd";

         
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return "Error during fetching"
      })
      this.setData(data);
    console.log(this.entities);
  },


  // beforeUpdate() {
  //   let data = this.$refs.entities;

  //   console.log(data);
  // },
  methods: {

    setData(data) {
      console.log(data);
      this.entities = data
    }
    // async fetchEntities() {
    //   await this.getEntitiesByFilters();
    //   let data = this.$refs.entities;
    //   console.log(data);
    // }
  },


  computed: {
    // entities(){
    //   return this.getEntities;
    // }

  }
});
</script>

<style lang="scss"> 

</style>
