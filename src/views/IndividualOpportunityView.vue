<template>
  <div class="mx-16 mb-16">
    <h1>{{ name }}</h1>
    <v-chip v-if="category !== null" class="mx-1 my-1" color="paleteal">
      {{ category }}
    </v-chip>
    <v-chip v-if="scope !== null" class="mx-1 my-1" color="paleteal">
      {{ scope }}
    </v-chip>
    <v-chip v-if="workload !== null" class="mx-1 my-1" color="paleteal">
      {{ workload }} Workload
    </v-chip>
    <div></div>
    <v-chip v-if="department !== 'NA'" class="mx-1 my-1" color="paleteal">
      <v-icon left>mdi-domain</v-icon>{{ department }}</v-chip
    >
    <span v-if="subjects[0] !== null">
      <v-chip
        class="mx-1 my-1"
        color="paleteal"
        v-for="s in subjects"
        :key="s"
        >{{ s }}</v-chip
      ></span
    >
    <div></div>
    <span v-if="tics[0] !== null">
      <v-chip class="mx-1 my-1" color="paleteal" v-for="t in tics" :key="t"
        ><v-icon left>mdi-account</v-icon>{{ t }}</v-chip
      >
    </span>
    <p class="light mt-2">
      For more information, contact {{ adminName }}.<br />Updated as of
      {{ timestamp }}.
    </p>
    <h2 class="pt-8" v-if="background !== null">Background</h2>
    <p>{{ background }}</p>
    <h2 v-if="duration !== null">Duration</h2>
    <p>{{ duration }}</p>
    <h2>Eligibility</h2>
    <p>
      <i
        >This opportunity is only open to
        <span v-if="years.length > 1"
          ><span v-for="y in years.slice(0, years.length - 1)" :key="y"
            >Y{{ y }},
          </span></span
        >Y{{ years.slice(-1)[0] }} students.</i
      >
    </p>
    <p>{{ eligibility }}</p>
    <h2 v-if="recommendation !== null">Recommendation</h2>
    <p>{{ recommendation }}</p>
    <h2 v-if="timeline !== null">Timeline</h2>
    <p>{{ timeline }}</p>
    <h2>Reviews ({{ reviews.length }})</h2>
    <span class="ma-4" v-for="r in reviews" :key="r.index">
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
    <h3 class="light mt-8 mb-2">
      {{
        reviewByStudent !== null ? "Update my review..." : "Write a review..."
      }}
    </h3>
    <v-card class="pa-8 rounded-lg" outlined tile elevation="2">
      <div class="mb-4">
        {{
          new Intl.DateTimeFormat("en-GB", {
            dateStyle: "long",
          }).format(
            reviewByStudent !== null
              ? new Date(reviewByStudent["timestamp"])
              : new Date()
          )
        }}
      </div>
      <v-rating
        v-model="rating"
        class="mb-2"
        color="primary"
        background-color="primary"
        dense
        half-increments
        size="28"
      ></v-rating>
      <h2>
        <v-text-field
          v-model="title"
          counter="50"
          label="Title"
          filled
        ></v-text-field>
      </h2>
      <v-textarea v-model="body" label="Body" filled></v-textarea>
      <v-btn class="paleteal--text" color="secondary" @click="resetReview"
        >Reset
      </v-btn>
      <v-btn class="paleteal--text ml-2" color="primary" @click="submitReview"
        >{{ reviewByStudent !== null ? "Update" : "Submit" }}
      </v-btn>

      <v-dialog v-model="dialog" width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            v-if="this.reviewByStudent !== null"
            class="paleteal--text ml-2"
            color="error"
            >Delete
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span>Are you sure?</span>
          </v-card-title>
          <v-card-text>Deleting your review is irreversible.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="error" text @click="deleteReview">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import store from "@/store";

export default {
  props: ["id", "isTaking", "isBookmarked"],
  data() {
    return {
      dialog: false,
      rating: 1,
      title: "",
      body: "",
      adminEmail: null, // Byline | adminEmail FK
      adminName: null,
      background: null, // Main body
      category: null, // Chips?
      department: null, // Byline | departmentId fk
      duration: null, // Main body
      eligibility: null, // Main body
      name: null, // Main body
      recommendation: null, // Main body
      scope: null, // Chips?
      timeline: null, // Main body
      timestamp: null, // Byline
      workload: null, // Chips?
      subjects: [], // Chips?
      years: [], // Byline
      tics: [], // Byline
      reviews: [],
      reviewByStudent: null,
    };
  },
  methods: {
    setIsTaking(value) {
      this.$emit("emitSetIsTaking", value);
    },
    setIsBookmarked(value) {
      this.$emit("emitSetIsBookmarked", value);
    },
    async loadOpportunity() {
      // TODO: Check exceptions for stuff that may be null
      console.log(this.id);
      let raw = await UserService.getOpportunity({ opportunityId: this.id });
      console.log("raw");
      console.log(raw);

      for (let i = 0; i < raw.length; i++) {
        if (!this.subjects.includes(raw[i].subject))
          this.subjects.push(raw[i].subject);
        if (!this.years.includes(raw[i].year)) this.years.push(raw[i].year);
        if (!this.tics.includes(raw[i].tic)) this.tics.push(raw[i].tic);
      }

      this.department = (
        await UserService.getDepartment({
          departmentId: raw[0]["departmentId"],
        })
      )[0]["departmentName"];

      console.log("the department");
      console.log(this.subjects);

      this.timestamp = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "long",
      }).format(new Date(raw[0]["timestamp"]));

      [
        this.adminEmail,
        this.background,
        this.category,
        this.duration,
        this.eligibility,
        this.name,
        this.recommendation,
        this.scope,
        this.timeline,
        this.workload,
      ] = [
        raw[0]["adminEmail"],
        raw[0]["background"],
        raw[0]["category"],
        raw[0]["duration"],
        raw[0]["eligibility"],
        raw[0]["opportunityName"],
        raw[0]["recommendation"],
        raw[0]["scope"],
        raw[0]["timeline"],
        raw[0]["workload"],
      ];

      // Load admin name
      this.adminName = (
        await UserService.isAdmin({
          email: this.adminEmail,
        })
      )[0]["name"];

      // Load reviews
      console.log("Reviews");
      this.reviews = await UserService.getApprovedReviews({
        opportunityId: this.id,
      });
      console.log(this.reviews);

      // Load student's review
      this.reviewByStudent = await UserService.getReviewByStudent({
        opportunityId: this.id,
        email: store.state.email,
      });

      this.reviewByStudent =
        this.reviewByStudent.length !== 0 ? this.reviewByStudent[0] : null;

      this.rating =
        this.reviewByStudent !== null ? this.reviewByStudent["rating"] : 1;
      this.title =
        this.reviewByStudent !== null ? this.reviewByStudent["title"] : "";
      this.body =
        this.reviewByStudent !== null ? this.reviewByStudent["body"] : "";

      let credentials = {
        email: store.state.email,
        opportunityId: this.id,
      };
      this.setIsTaking(
        (await UserService.checkTakeOpportunity(credentials)).length !== 0
      );
      this.setIsBookmarked(
        (await UserService.checkBookmarkOpportunity(credentials)).length !== 0
      );
      console.log("TBTBTB");
      console.log(credentials);
      console.log((await UserService.checkTakeOpportunity(credentials)).length);
      console.log(
        (await UserService.checkBookmarkOpportunity(credentials)).length
      );
      console.log(this.isTaking, this.isBookmarked);
    },
    isReviewValid() {
      return (
        Number.isFinite(this.rating) &&
        this.rating >= 1 &&
        this.title !== "" &&
        this.title.length < 50 &&
        this.body !== ""
      );
    },
    clearFields() {
      this.rating = 1;
      this.title = "";
      this.body = "";
    },
    resetReview() {
      this.rating =
        this.reviewByStudent !== null ? this.reviewByStudent["rating"] : 1;
      this.title =
        this.reviewByStudent !== null ? this.reviewByStudent["title"] : "";
      this.body =
        this.reviewByStudent !== null ? this.reviewByStudent["body"] : "";
    },
    async submitReview() {
      console.log(this.reviewByStudent);
      if (
        this.reviewByStudent !== null &&
        !this.reviewByStudent["isApproved"]
      ) {
        this.$toasted.show(
          "You have previously submitted a review that is pending approval.",
          {
            type: "error",
            theme: "bubble",
            position: "top-center",
          }
        );
        this.resetReview();
        return;
      }
      if (this.isReviewValid()) {
        console.log("Here");
        if (this.reviewByStudent !== null) {
          await UserService.updateReview({
            rating: this.rating,
            title: this.title,
            body: this.body,
            email: store.state.email,
            opportunityId: this.id,
          });
        } else {
          await UserService.createReview({
            rating: this.rating,
            title: this.title,
            body: this.body,
            email: store.state.email,
            opportunityId: this.id,
          });
        }
        console.log("awaited");
        await this.loadOpportunity();

        this.$toasted.show(
          this.reviewByStudent !== null
            ? "Your review has been updated! It will be published after being approved."
            : "Your review has been submitted! It will be published after being approved.",
          {
            type: "success",
            theme: "bubble",
            position: "top-center",
          }
        );
      } else {
        this.$toasted.show(
          "Please check that a rating of 1-5 is given and that the title and body are both filled up without error.",
          {
            type: "error",
            theme: "bubble",
            position: "top-center",
          }
        );
      }
    },
    async deleteReview() {
      this.dialog = false;

      await UserService.deleteReview({
        email: store.state.email,
        opportunityId: this.id,
      });

      await this.loadOpportunity();

      this.$toasted.show("Review deleted.", {
        type: "success",
        theme: "bubble",
        position: "top-center",
      });
      this.reviewByStudent = null;
    },
  },

  beforeMount() {
    console.log("Before mounting");
    this.loadOpportunity();
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

.light {
  font-weight: 300;
}
</style>
