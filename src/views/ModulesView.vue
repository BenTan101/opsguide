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
        >
        </v-data-table>
        <v-dialog v-model="dialog" width="500px">
          <v-card>
            <v-card-title>
              <span>Add/Bookmark Module</span>
            </v-card-title>
            <v-card-text
              ><h2 id="dialogModule">
                {{ module["code"] }}: {{ module["name"] }}
              </h2>
              You may choose to add (opt, major, honour) and bookmark this
              module.</v-card-text
            >
            <v-radio-group v-model="take" row class="ml-4">
              <v-radio label="Opt" value="Opt"></v-radio>
              <v-radio label="Major" value="Major"></v-radio>
              <v-radio label="Honour" value="Honour"></v-radio>
            </v-radio-group>
            <v-divider></v-divider>
            <v-radio-group v-model="bookmark" row class="ma-4">
              <v-radio label="Bookmark" value="Bookmark"></v-radio>
            </v-radio-group>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="reset">Reset</v-btn>
              <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" text @click="submit">{{
                actionWord
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      take: null,
      bookmark: null,
      initialTake: null,
      initialBookmark: null,
      actionWord: "Submit",
      dialog: false,
      type: ["Opt", "Major", "Honour"],
      module: { code: "", name: "", department: "" },
      modulesTab: "All",
      search: "",
      headers: [
        { text: "Module Code", value: "code" },
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
      this.module = { code: "", name: "", department: "" };
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
    async rowClick(module) {
      this.dialog = true;
      this.reset();
      this.module = module;

      let isTaking = await UserService.checkTakeModule({
        email: store.state.email,
        code: module["code"],
      });
      let isBookmarked = await UserService.checkBookmarkModule({
        email: store.state.email,
        code: module["code"],
      });

      if (isTaking.length + isBookmarked.length > 0) this.actionWord = "Update";
      if (isTaking.length !== 0) this.take = isTaking[0]["type"];
      if (isBookmarked.length !== 0) this.bookmark = "Bookmark";

      this.initialTake = this.take;
      this.initialBookmark = this.bookmark;
    },
    async submit() {
      console.log(this.take);
      console.log(this.bookmark);
      console.log(this.module);

      if (
        this.initialTake === this.take &&
        this.initialBookmark === this.bookmark &&
        this.take !== null &&
        this.bookmark !== null
      ) {
        this.dialog = false;
        console.log("nothing has changed");
        return;
      }

      // Taking
      if (this.initialTake !== this.take || this.take === null) {
        await UserService.deleteTakeModule({
          email: store.state.email,
          code: this.module["code"],
        });

        if (this.take !== null)
          await UserService.takeModule({
            email: store.state.email,
            code: this.module["code"],
            type: this.take,
          });
      }

      // Bookmarking
      if (this.bookmark === null) {
        await UserService.deleteBookmarkModule({
          email: store.state.email,
          code: this.module["code"],
        });
      } else if (
        this.initialBookmark === null &&
        this.bookmark === "Bookmark"
      ) {
        await UserService.bookmarkModule({
          email: store.state.email,
          code: this.module["code"],
        });
      }

      this.dialog = false;

      await this.populateTable(this.modulesTab);

      this.$toasted.show("Selection updated successfully.", {
        type: "success",
        theme: "bubble",
        position: "top-center",
      });
    },
    reset() {
      this.take = null;
      this.bookmark = null;
      this.initialTake = null;
      this.initialBookmark = null;
      this.actionWord = "Submit";
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

#dialogModule {
  color: #00a499;
  font-size: medium;
}

#flexbox {
  display: flex;
  flex-wrap: wrap;
}
</style>
