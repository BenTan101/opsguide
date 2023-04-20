<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn icon to="/"><v-icon>mdi-school</v-icon></v-btn>
        <span class="font-weight-light hidden-sm-and-down"
          >The NUS High Opportunities Guide</span
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items collapse>
        <v-btn to="/" depressed>Home</v-btn>
        <v-btn to="/opportunities" depressed>Opportunities</v-btn>
        <v-btn to="/modules" depressed>Modules</v-btn>
        <v-btn to="/reviews" depressed>Reviews</v-btn>
        <!--        <v-btn to="/contact" depressed>Contact</v-btn>-->
        <v-btn to="/login" depressed>{{
          store().state.isLoggedIn ? "Profile" : "Login"
        }}</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>

    <div id="bottom-bar">
      <p>
        A CS6131 Project by Lee I-Shiang (M23604). View the original site
        <a class="dark-link" href="https://wiki.nush.app">here</a>.
      </p>
    </div>
  </v-app>
</template>

<script lang="ts">
import store from "@/store";

export default {
  name: "App",

  data() {
    return {};
  },

  methods: {
    store() {
      return store;
    },
  },
};
</script>

<style scoped>
#bottom-bar {
  background-color: #333f48;
  color: #b5f0ec;
  padding: 5rem;
}
.dark-link {
  color: #e5ecea;
}
</style>
