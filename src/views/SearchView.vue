<template>
  <div>
    <v-card v-if="store().state.isLoggedIn" class="ma-16">
      <v-card-title>
        Opportunities
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
      ></v-data-table>
    </v-card>
    <h3 class="ma-16 font-weight-light" v-if="!store().state.isLoggedIn">
      <a href="/login">Log in</a> to browse available opportunities.
    </h3>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import { functions } from "@/services/functions";
import store from "@/store";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Opportunity",
          align: "start",
          sortable: false,
          value: "name",
        },
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
    async populateTable() {
      this.opportunities = functions.formatOpportunitiesForTable(
        await UserService.getAllOpportunities()
      );
      console.log(this.opportunities);
    },
  },
  beforeMount() {
    this.populateTable();
  },
};
</script>

<!--
        {
          name: "Singapore Mathematical Olympiad (SMO) (Junior)",
          category: "Competition",
          subject: ["Math"],
          scope: "National",
          year: [1, 2],
          duration: "May-June",
          workload: "Moderate",
        },
        {
          name: "Singapore Mathematical Olympiad (SMO) (Senior)",
          category: "Competition",
          subject: ["Math"],
          scope: "National",
          year: [3, 4],
          duration: "May-June",
          workload: "Moderate",
        },
        {
          name: "Singapore Mathematical Olympiad (SMO) (Open)",
          category: "Competition",
          subject: ["Math"],
          scope: "National",
          year: [1, 2, 3, 4, 5, 6],
          duration: "May-June",
          workload: "Moderate",
        },
        {
          name: "National STEM Championship",
          category: "Competition",
          subject: ["Math", "STEM"],
          scope: "National",
          year: [3],
          duration: "November-September",
          workload: "High",
        },
        {
          name: "Singapore Chemistry Olympiad (SChO)",
          category: "Competition",
          subject: ["STEM"],
          scope: "National",
          year: [5],
          duration: "June-November",
          workload: "High",
        },
        {
          name: "International Chemistry Olympiad (IChO)",
          category: "Competition",
          subject: ["Chemistry", "STEM"],
          scope: "International",
          year: [6],
          duration: "January-July",
          workload: "Very High",
        },
        {
          name: "Nanyang Research Programme (NRP)",
          category: "Research",
          subject: ["STEM", "Humanities"],
          scope: "National",
          year: [5],
          duration: "March-February",
          workload: "High",
        },
        {
          name: "NUS Modules (Math)",
          category: "IHL",
          subject: ["Math"],
          year: [5, 6],
          duration: "Semesterly",
          workload: "Moderate",
        },
        {
          name: "NUS Modules (Chemistry)",
          category: "IHL",
          subject: ["Chemistry"],
          year: [5, 6],
          duration: "Semesterly",
          workload: "Moderate",
        },
        {
          name: "Students' Council (Junior)",
          category: "Leadership",
          scope: "School",
          year: [3, 4],
          duration: "2 years",
          workload: "Moderate",
        },
        {
          name: "Students' Council (Senior)",
          category: "Leadership",
          scope: "School",
          year: [5],
          duration: "1 year",
          workload: "Moderate",
        },
-->
