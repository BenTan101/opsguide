<template>
  <v-container class="pa-16">
    <h1 v-if="store().state.isLoggedIn">Hello, {{ store().state.name }}!</h1>
    <h2 class="pt-8">Year of Graduation</h2>
    <h3 class="font-weight-light">{{ store().state.graduationYear }}</h3>
    <v-btn class="mt-16 paleteal--text" color="#a11603" @click="logout"
      >Logout
    </v-btn>
  </v-container>
</template>

<script>
import store from "@/store";

export default {
  methods: {
    store() {
      return store;
    },
    logout() {
      store.commit("logout");
      this.$toasted.show("Logged out.", {
        theme: "bubble",
        position: "top-center",
      });
    },
  },
};
</script>

<style scoped>
h1 {
  color: #3ca073;
}

h2 {
  color: #00a499;
  font-weight: 500;
}
</style>
