<template>
  <body>
      <div class="container">
    <form class="form-inline">
      <input class="form-control mr-sm-2" style="width:200px" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>

  <div>
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
    const { getEntitiesByFilters } = sEntity;

    return { getEntities, getEntitiesByFilters };
  },

  data() {
    return {
      entities: []
    };
  },

  async mounted() {
    // {"order": "nom:desc"}).
    const response = await this.getEntitiesByFilters().then(res => res = res.data.body.communes);
    // console.log(response);
    if (response) {
       this.entities = response;
    }

  },

  methods: {
  },


  computed: {
  }
});
</script>

<style lang="scss"> 

</style>
