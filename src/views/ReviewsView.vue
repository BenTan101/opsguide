<template>
  <div class="pa-16">
    <span v-if="store().state.isLoggedIn">
      <h1 class="pb-4">
        {{ store().state.isAdmin ? "Unapproved Reviews" : "My Reviews" }}
      </h1>
      <span class="ma-4" v-for="r in reviews" :key="r.index">
        <v-card class="pa-8 rounded-lg" outlined tile elevation="2">
          <h2 class="mb-2">{{ r["opportunityName"] }}</h2>
          <p v-if="store().state.isAdmin" class="font-weight-light">
            {{ r["name"] }} | {{ r["email"] }}
          </p>
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
          <v-card-actions class="mt-4" v-if="store().state.isAdmin">
            <v-btn
              color="primary"
              text
              @click="approveReview(r['email'], r['id'])"
            >
              Approve
            </v-btn>
            <v-btn
              color="error"
              text
              @click="deleteReview(r['email'], r['id'])"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </span>
    </span>
    <h3 v-if="!store().state.isLoggedIn">
      <a href="/login">Log in</a> to write reviews.
    </h3>
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
    store() {
      return store;
    },
    async loadReviews() {
      if (store.state.isAdmin) {
        this.reviews = await UserService.getUnapprovedReviews();
      } else {
        this.reviews = await UserService.getAllApprovedReviewsByStudent({
          email: store.state.email,
        });
      }
    },
    async approveReview(email, opportunityId) {
      if (
        await UserService.approveReview({
          email: email,
          opportunityId: opportunityId,
        })
      ) {
        this.$toasted.show("Review approved.", {
          type: "success",
          theme: "bubble",
          position: "top-center",
        });
      }
      await this.loadReviews();
    },
    async deleteReview(email, opportunityId) {
      if (
        await UserService.deleteReview({
          email: email,
          opportunityId: opportunityId,
        })
      ) {
        this.$toasted.show("Review deleted.", {
          type: "success",
          theme: "bubble",
          position: "top-center",
        });
      }
      await this.loadReviews();
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

h3 {
  font-weight: 300;
}
</style>
