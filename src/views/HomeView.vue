<template>
  <body>
    <div class="miniform">
      <input type="search" placeholder="Search" aria-label="Search" v-on:keyup="searchEntities">
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
    const { getEntitiesByFilters, getEntitiesByTerms } = sEntity;

    return { getEntities, getEntitiesByFilters, getEntitiesByTerms };
  },

  data() {
    return {
      entities: []
    };
  },

  async mounted() {
    // {"order": "nom:desc"}).
    let res = await this.getEntitiesByFilters().then(res => res = res.data.body.communes);
    // console.log(response);
    if (res) {
       this.entities = res;
    }

  },

  methods: {
    async searchEntities(e) {
      console.log(e.target.value);
      let fff = await this.getEntitiesByTerms({"term": e.target.value}).then(res => res = res.data.body.communes)
      if (fff) {
        console.log(fff);
        this.entities = fff;
      }
    }
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
