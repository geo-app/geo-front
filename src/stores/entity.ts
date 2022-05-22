import axios from "axios";
import { defineStore } from "pinia";
import { environment } from '../../environment/environment';

export const entityStore = defineStore("entityStore", {
  state: () => ({
    entities: [],
  }),

  getters: {
    // Return dark mode value
    getEntities(state) {
      return state.entities;
    },
  },
  actions: {


    async getEntitiesByFilters(filters: []) {
      await axios.get(environment.WEP_API_URL+ "/communes", { params: filters })
      .then(function (response) {
        // handle success
        console.log(response?.data?.body?.communes.length);
        return response?.data?.body?.communes.length;
         
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return "Error during fetching"
      })
    }
  }
});
