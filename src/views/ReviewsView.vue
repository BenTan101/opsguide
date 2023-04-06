<template>
  <div class="pa-16">
    <h1 class="pb-4">Reviews</h1>
    <span class="ma-4" v-for="r in reviews" :key="r.index">
      <h2 class="mt-4 mb-2">{{ r["opportunityName"] }}</h2>
      <v-card class="pa-8 rounded-lg" outlined tile elevation="2">
        <div class="mb-4">
          {{
            new Intl.DateTimeFormat("en-GB", {
              dateStyle: "long",
            }).format(new Date(r["timestamp"]))
          }}
        </div>
        <v-rating
          class="mb-2"
          :value="r['rating']"
          color="primary"
          background-color="primary"
          dense
          half-increments
          readonly
          size="28"
        ></v-rating>
        <h3>{{ r["title"] }}</h3>

        <div>{{ r["body"] }}</div>
      </v-card>
    </span>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import store from "@/store";

export default {
  data() {
    return {
      reviews: [],
    };
  },
  methods: {
    async loadReviews() {
      this.reviews = await UserService.getAllApprovedReviewsByStudent({
        email: store.state.email,
      });
    },
  },
  beforeMount() {
    this.loadReviews();
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
