<template>
  <v-container class="pa-16">
    <v-btn class="mb-4" elevation="2" color="dark" to="/opportunities" icon>
      <v-icon> mdi-arrow-left </v-icon>
    </v-btn>
    <h3 class="font-weight-light mt-8 mb-2">
      All fields marked * are compulsory.
    </h3>
    <h1>New Opportunity*</h1>
    <p>
      e.g. International Chemistry Olympiad (IChO), Nanyang Research Programme
      (NRP).
    </p>
    <v-text-field filled v-model="name"></v-text-field>
    <!-- TODO: Make code less repeated -->
    <h2>Department*</h2>
    <v-radio-group v-model="department" row hide-details>
      <v-radio
        v-for="n in departments"
        :key="n['departmentId']"
        :label="`${n['departmentName']}`"
        :value="`${n['departmentId']}`"
      ></v-radio>
    </v-radio-group>
    <v-btn color="primary" class="mb-6" text @click="reset('department')"
      >Reset</v-btn
    >
    <h2 class="mb-2">Category*</h2>
    <v-radio-group v-model="category" row hide-details>
      <v-radio
        v-for="n in categories"
        :key="n"
        :label="`${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
    <v-btn color="primary" class="mb-6" text @click="reset('category')"
      >Reset</v-btn
    >
    <h2 class="mb-2">Scope*</h2>
    <v-radio-group v-model="scope" row hide-details>
      <v-radio
        v-for="n in scopes"
        :key="n"
        :label="`${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
    <v-btn color="primary" class="mb-6" text @click="reset('scope')"
      >Reset</v-btn
    >
    <h2 class="mb-2">Workload</h2>
    <v-radio-group v-model="workload" row hide-details>
      <v-radio
        v-for="n in workloads"
        :key="n"
        :label="`${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
    <v-btn color="primary" class="mb-6" text @click="reset('workload')"
      >Reset</v-btn
    >
    <h2 class="mb-2">Subject(s)</h2>
    <v-autocomplete
      v-model="subjectsChosen"
      :items="subjects"
      class="mb-6"
      chips
      clearable
      multiple
      filled
      hide-details
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip v-bind="attrs" :input-value="selected" @click="select">
          {{ item }}
        </v-chip>
      </template>
    </v-autocomplete>
    <h2>Teacher(s)-In-Charge</h2>
    <p>
      Enter their full name and salutation, e.g. Dr Li Wei, Dr Lee Chan Lye.
    </p>
    <v-combobox
      v-model="ticsChosen"
      :items="tics"
      class="mt-2 mb-6"
      chips
      clearable
      multiple
      filled
      hide-details
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip v-bind="attrs" :input-value="selected" @click="select">
          {{ item }}
        </v-chip>
      </template>
    </v-combobox>
    <h2>Background*</h2>
    <p>A short summary of the opportunity.</p>
    <v-textarea filled v-model="background"></v-textarea>
    <h2>Duration</h2>
    <p>e.g. January-July.</p>
    <v-text-field filled v-model="duration"></v-text-field>
    <h2>Eligibility*</h2>
    <p>Which years of students are eligible.</p>
    <v-autocomplete
      v-model="yearsChosen"
      :items="years"
      class="pb-4"
      chips
      clearable
      multiple
      filled
      hide-details
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip v-bind="attrs" :input-value="selected" @click="select">
          {{ item }}
        </v-chip>
      </template>
    </v-autocomplete>
    <p>
      How to get accepted to the opportunity, if applicable, e.g. Fill up a
      form, pass a selection test.
    </p>
    <v-textarea filled v-model="eligibility"></v-textarea>
    <h2>Recommendation</h2>
    <p>What type of people might be interested, e.g. Chemistry enthusiasts.</p>
    <v-textarea filled v-model="recommendation"></v-textarea>
    <h2>Timeline</h2>
    <p>
      A more detailed rundown of the schedule, e.g. What will be done each
      month.
    </p>
    <v-textarea filled v-model="timeline"></v-textarea>
    <v-btn class="mb-16 paleteal--text" color="#00a499" @click="submit"
      >Submit</v-btn
    >
  </v-container>
</template>

<script>
import UserService from "@/services/UserService";
import store from "@/store";

export default {
  data() {
    return {
      name: "",
      category: "",
      scope: "",
      duration: "",
      workload: "",
      background: "",
      recommendation: "",
      eligibility: "",
      timeline: "",
      department: "",
      tics: [],
      subjectsChosen: [],
      ticsChosen: [],
      yearsChosen: [],
      departments: [],
      categories: ["Competition", "Research", "IHL Module", "Leadership"],
      scopes: ["Internal", "External", "National", "International"],
      workloads: ["Low", "Moderate", "High", "Very High"],
      subjects: [
        "CS",
        "Mathematics",
        "Chemistry",
        "Biology",
        "Physics",
        "STEM",
        "Humanities",
        "Research",
        "Languages",
      ],
      years: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"],
    };
  },
  methods: {
    reset(type) {
      switch (type) {
        case "department":
          this.department = "";
          break;
        case "category":
          this.category = "";
          break;
        case "scope":
          this.scope = "";
          break;
        case "workload":
          this.workload = "";
          break;
      }
    },
    isEverythingValid() {
      console.log(
        "\nthis.name: " + this.name,
        "\nthis.cate: " + this.category,
        "\nthis.scop: " + this.scope,
        "\nthis.dura: " + this.duration,
        "\nthis.work: " + this.workload,
        "\nthis.back: " + this.background,
        "\nthis.reco: " + this.recommendation,
        "\nthis.elig: " + this.eligibility,
        "\nthis.time: " + this.timeline,
        "\nthis.depa: " + this.department,
        "\nthis.tics: " + this.ticsChosen,
        "\nthis.subj: " + this.subjectsChosen,
        "\nthis.yers: " + this.yearsChosen
      );
      return (
        this.name !== "" &&
        this.category !== "" &&
        this.scope !== "" &&
        this.background !== "" &&
        this.department !== "" &&
        this.yearsChosen.length !== 0
      );
    },
    async submit() {
      let allOpportunities = await UserService.getAllOpportunities();
      console.log(allOpportunities);

      // TODO: do create opportunity
      if (this.isEverythingValid()) {
        let opportunityDetails = {
          name: this.name,
          category: this.category,
          scope: this.scope,
          duration: this.duration,
          workload: this.workload,
          background: this.background,
          recommendation: this.recommendation,
          eligibility: this.eligibility,
          timeline: this.timeline,
          departmentId: this.department,
          email: store.state.email,
        };

        console.log("opportunity Details-------------");
        console.log(opportunityDetails);

        // Insert opportunity
        await UserService.createOpportunity(opportunityDetails);

        console.log(
          await UserService.getOpportunityByName({ name: this.name })
        );
        let opportunityId = (
          await UserService.getOpportunityByName({ name: this.name })
        )[0]["opportunityId"];
        console.log("The opportunityId: ", opportunityId);

        // Insert years
        if (this.yearsChosen.length !== 0) {
          let year = "";
          for (const y of this.yearsChosen) {
            year = await UserService.addYear({
              opportunityId: opportunityId,
              year: y.charAt(y.length - 1),
            });
          }
        }

        // Insert subjects
        if (this.subjectsChosen.length !== 0) {
          let subject = "";
          for (const s of this.subjectsChosen) {
            subject = await UserService.addSubject({
              opportunityId: opportunityId,
              subject: s,
            });
          }
        }

        console.log("TICS: ", this.ticsChosen);
        if (this.ticsChosen.length !== 0) {
          let tic = "";
          for (const t of this.ticsChosen) {
            tic = await UserService.addTIC({
              opportunityId: opportunityId,
              tic: t,
            });
          }
        }

        this.$toasted.show("Opportunity added successfully.", {
          type: "success",
          theme: "bubble",
          position: "top-center",
        });

        this.name = "";
        this.department = "";
        this.category = "";
        this.scope = "";
        this.workload = "";
        this.subjectsChosen = [];
        this.ticsChosen = [];
        this.background = "";
        this.duration = "";
        this.eligibility = "";
        this.yearsChosen = [];
        this.recommendation = "";
        this.timeline = "";
      } else {
        this.$toasted.show("Please fill up all required fields.", {
          type: "error",
          theme: "bubble",
          position: "top-center",
        });
      }
    },
    async loadDepartments() {
      this.departments = await UserService.getDepartments();
    },
  },
  beforeMount() {
    this.loadDepartments();
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
