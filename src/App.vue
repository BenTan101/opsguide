<template>
  <v-app :style="cssProps">
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light hidden-sm-and-down"
          >The NUS High Opportunities Guide</span
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items collapse>
        <v-btn to="/" depressed>Home</v-btn>
        <v-btn to="/search" depressed>Search</v-btn>
        <v-btn to="/contact" depressed>Contact</v-btn>
        <v-btn to="/login" depressed>Login</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <div id="bottom-bar">
      <p>
        A CS6131 Assignment by Lee I-Shiang (M23604). View the original site
        <a class="dark-link" href="https://wiki.nush.app">here</a>.
      </p>
    </div>
  </v-app>
</template>

<script lang="ts">
export default {
  name: "App",

  data() {
    return {};
  },

  computed: {
    cssProps() {
      var themeColors = {};
      Object.keys(this.$vuetify.theme.themes.light).forEach((color) => {
        themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light[color];
      });
      return themeColors;
    },
  },
};
</script>

<style scoped>
#bottom-bar {
  background-color: var(--v-dark);
  color: var(--v-lightteal);
  padding: 5rem;
}
.dark-link {
  color: var(--v-paleteal);
}
</style>
