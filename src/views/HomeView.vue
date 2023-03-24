<template>
  <v-container class="pa-16">
    <h1>OpsGuide: Charting Your Course in NUS High</h1>
    <h3 class="font-weight-light">
      Bored? Finding something to do with your life?<br /><br />Look no
      further!<br /><br />
      This guide aims to inform you of the opportunities you can sign up for,
      whether it's competitions, programmes, university modules, or anything
      else!
    </h3>

    <v-btn
      class="mt-2 paleteal--text"
      color="#333f48"
      elevation="5"
      rounded
      to="/search"
      >Let's go.</v-btn
    >

    <v-container class="lighten-5 pt-8 px-16">
      <v-row>
        <v-col>
          <v-card class="pa-8" outlined tile elevation="4">
            <h2>Comprehensive</h2>
            <p>
              Find opportunities spanning the sciences, the arts, and beyond.
            </p>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-8" outlined tile elevation="4">
            <h2>Reliable</h2>
            <p>Browse testimonials from seniors for a balanced perspective.</p>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-8" outlined tile elevation="4">
            <h2>Organised</h2>
            <p>
              Search for opportunities by category with this one-stop portal.
            </p>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-8" outlined tile elevation="4">
            <h2>Updated</h2>
            <p>Stay tuned to the latest changes in opportunities.</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
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
