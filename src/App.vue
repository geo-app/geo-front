<template>
    <div class="container">
  <section>
    <header>
      <div class="wrapper">
          <Navbar />
      </div>
    </header>
    <div class="container-center">
      <RouterView />
    </div>
  </section>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
  },

  // data() {
  //   return {
  //   };
  // },
});
</script>

<style lang="scss">
@import "@/assets/base.css";
</style>
