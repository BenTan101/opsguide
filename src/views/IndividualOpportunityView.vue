<template>
  <div class="mx-16 mb-16">
    <h1>{{ name }}</h1>
    <v-chip class="mx-1 my-1" color="paleteal">
      {{ category }}
    </v-chip>
    <v-chip class="mx-1 my-1" color="paleteal">
      {{ scope }}
    </v-chip>
    <v-chip class="mx-1 my-1" color="paleteal">
      {{ workload }} Workload
    </v-chip>
    <div></div>
    <v-chip class="mx-1 my-1" color="paleteal">
      <v-icon left>mdi-domain</v-icon>{{ department }}</v-chip
    >
    <v-chip class="mx-1 my-1" color="paleteal" v-for="s in subjects" :key="s">{{
      s
    }}</v-chip>
    <div></div>
    <v-chip class="mx-1 my-1" color="paleteal" v-for="t in tics" :key="t"
      ><v-icon left>mdi-account</v-icon>{{ t }}</v-chip
    >
    <p class="mt-2">
      <i
        >For more information, contact {{ adminEmail }}.<br />Updated as of
        {{ timestamp }}.</i
      >
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
    <h2>Reviews</h2>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  props: ["id"],
  data() {
    return {
      adminEmail: null, // Byline | adminEmail FK
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
    };
  },
  methods: {
    async loadOpportunity() {
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
    },
  },
  beforeMount() {
    console.log("Before moutning");
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
</style>
