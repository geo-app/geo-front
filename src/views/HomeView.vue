<template>
  <body>
    <div class="miniform">
      <input type="search" placeholder="Search by name" aria-label="Search" v-on:keyup="searchEntities">

      <form class="form-inline" @submit.prevent="searchEntitiesByPopulation">
        <input type="number" name="min" placeholder="Min" v-model="params.min">
        <input type="number" name="max" placeholder="Max" v-model="params.max">

        <select name="direction" id="" v-model="params.direction">
          <option value="">--Please choose an option--</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
      </select>


        <button type="submit">Search</button>
      </form>
    </div>

    <div>
      <p>{{ length }} Entities</p>
      <pre v-for="entity in entities" :key="entity.nom">
        {{ entity }}
      </pre>
    </div>
  </body>
</template>

<script>
import { defineComponent } from "vue";

import { entityStore } from "@/stores/entity";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "HomeView",
  components: {
  },

 setup() {
    const sEntity = entityStore();
    const { getEntities } = storeToRefs(sEntity);
    const { getEntitiesByFilters, getEntitiesByTerms, getEntitiesByPopulation } = sEntity;

    return { getEntities, getEntitiesByFilters, getEntitiesByTerms, getEntitiesByPopulation };
  },

  data() {
    return {
      length : "",
      entities: [],
      params: {
        min: Number,
        max: Number,
        direction: String
      }
    };
  },

  async mounted() {
    // {"order": "nom:desc"}).
    let res = await this.getEntitiesByFilters().then(res => res = res.data.body.communes);
    // console.log(response);
    if (res) {
       this.entities = res;
       this.length = res.length;
    }

  },

  methods: {
    async searchEntities(e) {
      let res = await this.getEntitiesByTerms({"term": e.target.value}).then(res => res = res.data.body.communes)
      if (res) {
        this.entities = res;
        this.length = res.length;
      }
    },


    async searchEntitiesByPopulation() {
      // console.log(this.params);
      let res = await this.getEntitiesByPopulation(this.params).then(res => res = res.data.body.communes)
      if (res) {
        console.log(res.length);
        this.entities = res;
        this.length = res.length;
      }
    },
  },


  computed: {
  }
});
</script>

<style lang="scss"> 
.miniform {
  text-align: center;
  margin: 20px 0;
}
</style>
