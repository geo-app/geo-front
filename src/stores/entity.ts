import axios from "axios";
import { defineStore } from "pinia";
import { environment } from '../../environment/environment';

export const entityStore = defineStore("entityStore", {
  state: () => ({
    entities: Object,
  }),

  getters: {
    // Return dark mode value
    getEntities(state) {
      return state.entities;
    },
  },
  actions: {

    async getEntitiesByFilters(filters: []) {
      return await axios.get(environment.WEP_API_URL+ "/communes", { params: filters })
      // .then(function (response) {
      //   // handle success
      //   // console.log(response?.data?.body?.communes.length);
      //   // this.entities = response?.data?.body?.communes;
      //   console.log(response?.data?.body?.communes.length);
        
      //   return response?.data?.body?.communes.length;
         
      // })
      // .catch(function (error) {
      //   // handle error
      //   console.log(error);
      //   return "Error during fetching"
      // })
    },


    async getEntitiesByTerms(terms: String) {
      return await axios.get(environment.WEP_API_URL+ "/search", { params: terms })
    },


    async getEntitiesByPopulation(params: { min: Number, max: Number, direction: String}) {
      return await axios.get(environment.WEP_API_URL+ "/communes-by-population", { params: params })
    }
  }
});
