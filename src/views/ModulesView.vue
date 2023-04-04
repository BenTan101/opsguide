<template>
  <div class="ma-16">
    <div>
      <div id="flexbox">
        <h3 v-bind:class="getTabStyle('All')" @click="changeTab('All')">
          All Modules
        </h3>
        <h3 v-bind:class="getTabStyle('Modules')" @click="changeTab('Modules')">
          My Modules
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
          :items="modules"
          :search="search"
          :items-per-page="5"
          @click:row="rowClick"
        ></v-data-table>
      </v-card>
    </div>

    <h3 class="mt-16" v-if="!store().state.isLoggedIn">
      <a href="/login">Log in</a> to browse available modules.
    </h3>
  </div>
</template>

<script>
import store from "@/store";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      modulesTab: "All",
      search: "",
      headers: [
        {
          text: "Module Code",
          align: "start",
          sortable: true,
          value: "code",
        },
        { text: "Module Name", value: "name" },
        { text: "Department", value: "department" },
      ],
      modules: [],
    };
  },
  methods: {
    store() {
      return store;
    },
    getTabStyle(type) {
      return this.modulesTab === type
        ? "d-inline px-3 py-2 primary white--text"
        : "d-inline px-3 py-2 paleteal black--text";
    },
    changeTab(type) {
      this.modulesTab = type;
      this.populateTable(type);
      this.headers = [
        {
          text: "Module Code",
          align: "start",
          sortable: true,
          value: "code",
        },
        { text: "Module Name", value: "name" },
        { text: "Department", value: "department" },
        type === "Modules" ? { text: "Type", value: "type" } : {},
      ];
    },
    async populateTable(type) {
      this.modules = [];
      switch (type) {
        case "All":
          this.modules = await UserService.getAllModules();
          break;
        case "Modules":
          this.modules = await UserService.getMyModules({
            email: store.state.email,
          });
          break;
        case "Bookmarks":
          this.modules = await UserService.getBookmarkedModules({
            email: store.state.email,
          });
          break;
      }
    },
    rowClick(module) {
      console.log("DIALOG");
      console.log(module);
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
