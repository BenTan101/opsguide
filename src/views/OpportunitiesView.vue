<template>
  <div class="ma-16">
    <v-btn
      class="ml-16 mb-4"
      v-if="seeOpportunity"
      elevation="2"
      color="dark"
      @click="unseeOpportunity"
      icon
    >
      <v-icon> mdi-arrow-left </v-icon>
    </v-btn>
    <v-btn
      class="ml-4 mb-4"
      v-if="seeOpportunity && store().state.isAdmin"
      elevation="2"
      color="dark"
      @click="editOpportunity"
      icon
    >
      <v-icon> mdi-pencil </v-icon>
    </v-btn>
    <v-btn
      class="ml-4 mb-4"
      v-if="seeOpportunity && store().state.isAdmin"
      elevation="2"
      color="dark"
      @click="deleteOpportunity"
      icon
    >
      <v-icon> mdi-delete </v-icon>
    </v-btn>

    <v-dialog v-model="dialog" width="300px">
      <v-card>
        <v-card-title>
          <span>Are you sure?</span>
        </v-card-title>
        <v-card-text>Deleting this opportunity is irreversible.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="error" text @click="deleteOpportunity">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
      class="ml-4 mb-4"
      v-if="seeOpportunity && !store().state.isAdmin"
      elevation="2"
      color="dark"
      @click="toggleTakeOpportunity"
      icon
    >
      <v-icon :color="isTaking ? 'error' : 'primary'">
        {{ isTaking ? "mdi-minus" : "mdi-plus" }}
      </v-icon>
    </v-btn>
    <v-btn
      class="ml-4 mb-4"
      v-if="seeOpportunity && !store().state.isAdmin"
      elevation="2"
      color="dark"
      @click="toggleBookmarkOpportunity"
      icon
    >
      <v-icon color="primary">
        {{ isBookmarked ? "mdi-bookmark" : "mdi-bookmark-outline" }}
      </v-icon>
    </v-btn>
    <div v-if="store().state.isLoggedIn && !seeOpportunity">
      <div id="flexbox">
        <h3
          v-bind:class="getTabStyle('All')"
          @click="!store().state.isAdmin ? changeTab('All') : ''"
        >
          All Opportunities
        </h3>
        <h3
          v-if="!store().state.isAdmin"
          v-bind:class="getTabStyle('Opportunities')"
          @click="changeTab('Opportunities')"
        >
          My Opportunities
        </h3>
        <h3
          v-if="!store().state.isAdmin"
          v-bind:class="getTabStyle('Bookmarks')"
          @click="changeTab('Bookmarks')"
        >
          My Bookmarks
        </h3>
      </div>

      <v-card>
        <v-card-title>
          <v-btn
            v-if="store().state.isAdmin"
            to="/opportunities/add"
            elevation="2"
            color="secondary"
            icon
            ><v-icon> mdi-plus </v-icon>
          </v-btn>
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
          :loading="isLoading"
        ></v-data-table>
      </v-card>
    </div>

    <IndividualOpportunityView
      v-if="seeOpportunity"
      :id="opportunityId"
      :isTaking="isTaking"
      :isBookmarked="isBookmarked"
      @emitSetIsTaking="(value) => (isTaking = value)"
      @emitSetIsBookmarked="(value) => (isBookmarked = value)"
    />

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
      isLoading: true,
      dialog: false,
      isTaking: false,
      isBookmarked: false,
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
    async changeTab(type) {
      this.opportunitiesTab = type;
      await this.populateTable(type);
    },
    async populateTable(type) {
      this.isLoading = true;
      this.opportunities = [];
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
      this.isLoading = false;
    },
    rowClick(opportunity) {
      this.opportunityId = opportunity["id"];
      this.seeOpportunity = true;
    },
    unseeOpportunity() {
      this.seeOpportunity = false;
      this.populateTable(this.opportunitiesTab);
    },
    editOpportunity() {
      // TODO: Work in Progress...
    },
    async deleteOpportunity() {
      if (!this.dialog) {
        this.dialog = true;
      } else {
        await UserService.deleteOpportunity({ id: this.opportunityId });
        this.dialog = false;
        this.unseeOpportunity();
      }
    },
    async toggleTakeOpportunity() {
      let credentials = {
        email: store.state.email,
        opportunityId: this.opportunityId,
      };

      if (!this.isTaking) {
        await UserService.takeOpportunity(credentials);

        this.$toasted.show("Opportunity taken successfully.", {
          type: "success",
          theme: "bubble",
          position: "top-center",
        });
      } else {
        await UserService.deleteTakeOpportunity(credentials);

        this.$toasted.show("Opportunity dropped successfully.", {
          type: "success",
          theme: "bubble",
          position: "top-center",
        });
      }

      this.isTaking = !this.isTaking;
    },
    async toggleBookmarkOpportunity() {
      let credentials = {
        email: store.state.email,
        opportunityId: this.opportunityId,
      };

      if (!this.isBookmarked) {
        await UserService.bookmarkOpportunity(credentials);

        this.$toasted.show("Opportunity bookmarked successfully.", {
          type: "success",
          theme: "bubble",
          position: "top-center",
        });
      } else {
        await UserService.deleteBookmarkOpportunity(credentials);

        this.$toasted.show("Opportunity removed from bookmarks successfully.", {
          type: "success",
          theme: "bubble",
          position: "top-center",
        });
      }

      this.isBookmarked = !this.isBookmarked;
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
