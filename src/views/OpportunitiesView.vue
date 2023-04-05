<template>
  <div class="ma-16">
    <v-btn
      class="ml-16 mb-4"
      v-if="seeOpportunity"
      elevation="2"
      color="#333f48"
      @click="unseeOpportunity"
      icon
    >
      <v-icon> mdi-arrow-left </v-icon>
    </v-btn>
    <div v-if="!seeOpportunity">
      <!--    <div v-if="store().state.isLoggedIn">-->
      <div id="flexbox">
        <h3 v-bind:class="getTabStyle('All')" @click="changeTab('All')">
          All Opportunities
        </h3>
        <h3
          v-bind:class="getTabStyle('Opportunities')"
          @click="changeTab('Opportunities')"
        >
          My Opportunities
        </h3>
        <h3
          v-bind:class="getTabStyle('Bookmarks')"
          @click="changeTab('Bookmarks')"
        >
          My Bookmarks
        </h3>
      </div>

      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="opportunities"
          :search="search"
          :items-per-page="5"
          @click:row="rowClick"
        ></v-data-table>
      </v-card>
    </div>

    <IndividualOpportunityView v-if="seeOpportunity" :id="opportunityId" />

    <h3 class="mt-16" v-if="!store().state.isLoggedIn">
      <a href="/login">Log in</a> to browse available opportunities.
    </h3>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import { functions } from "@/services/functions";
import store from "@/store";
import IndividualOpportunityView from "@/views/IndividualOpportunityView.vue";

export default {
  components: { IndividualOpportunityView },
  data() {
    return {
      opportunityId: -1,
      seeOpportunity: false,
      opportunitiesTab: "All",
      search: "",
      headers: [
        { text: "Opportunity", value: "name" },
        { text: "Category", value: "category" },
        { text: "Scope", value: "scope" },
        { text: "Subject", value: "subject" },
        { text: "Year", value: "year" },
        { text: "Duration", value: "duration" },
        { text: "Workload", value: "workload" },
        { text: "TIC", value: "tic" },
        // Other attributes like opportunityId, background, recommendation, eligibility, timeline, timestamp, departmentId, adminEmail
      ],
      opportunities: [],
    };
  },
  methods: {
    store() {
      return store;
    },
    getTabStyle(type) {
      return this.opportunitiesTab === type
        ? "d-inline px-3 py-2 primary white--text"
        : "d-inline px-3 py-2 paleteal black--text";
    },
    changeTab(type) {
      this.opportunitiesTab = type;
      console.log("Yes");
      this.populateTable(type);
      console.log("dssdf");
    },
    async populateTable(type) {
      this.opportunities = [];
      console.log("e");
      switch (type) {
        case "All":
          this.opportunities = functions.formatOpportunitiesForTable(
            await UserService.getAllOpportunities()
          );
          break;
        case "Opportunities":
          this.opportunities = functions.formatOpportunitiesForTable(
            await UserService.getMyOpportunities({ email: store.state.email })
          );
          break;
        case "Bookmarks":
          this.opportunities = functions.formatOpportunitiesForTable(
            await UserService.getBookmarkedOpportunities({
              email: store.state.email,
            })
          );
          break;
      }
      console.log("f");

      console.log(this.opportunities);
      console.log("g");
    },
    rowClick(opportunity) {
      console.log("Here");
      console.log(opportunity);
      this.opportunityId = opportunity["id"];
      this.seeOpportunity = true;
    },
    unseeOpportunity() {
      this.seeOpportunity = false;
    },
  },
  beforeMount() {
    this.populateTable("All");
  },
};
</script>

<style scoped>
h1 {
  color: #3ca073;
}

h2 {
  color: #e5ecea;
  font-weight: 400;
}

h3 {
  font-weight: 300;
}

#flexbox {
  display: flex;
  flex-wrap: wrap;
}
</style>
