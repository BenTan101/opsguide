<template>
  <v-card class="ma-16">
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
      :items="desserts"
      :search="search"
      :items-per-page="5"
    ></v-data-table>
  </v-card>
</template>

<script lang="ts">
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
        { text: "Subject", value: "subject" },
        { text: "Scope", value: "scope" },
        { text: "Year", value: "year" },
        { text: "Duration/Period", value: "duration" },
        { text: "Workload", value: "workload" },
      ],
      desserts: [
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
      ],
    };
  },
};
</script>
