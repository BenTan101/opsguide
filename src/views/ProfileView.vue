<template>
  <v-container class="pa-16">
    <h1 class="pb-8">Hello, {{ store().state.name }}!</h1>
    <h2 class="pb-4">Details</h2>
    <p>{{ store().state.email }}</p>
    <v-text-field label="Name" filled v-model="name"></v-text-field>
    <v-text-field
      label="Year of graduation"
      filled
      v-model="graduationYear"
      v-if="!store().state.isAdmin"
      :error-messages="
        !functions.isGraduationYearValid(graduationYear)
          ? [
              `Year must be between ${new Date().getFullYear()} and ${
                new Date().getFullYear() + 5
              }.`,
            ]
          : []
      "
    ></v-text-field>
    <h3 class="font-weight-light mt-8 mb-2">Change password</h3>
    <v-text-field
      label="Current password"
      type="password"
      filled
      v-model="oldPassword"
    ></v-text-field>
    <v-text-field
      label="New password"
      type="password"
      filled
      v-model="newPassword"
    ></v-text-field>
    <v-text-field
      label="Retype new password"
      type="password"
      filled
      v-model="newPasswordRetyped"
      :error-messages="
        this.newPassword !== this.newPasswordRetyped
          ? ['Passwords do not match.']
          : []
      "
    ></v-text-field>
    <v-btn class="mb-16 paleteal--text" color="#00a499" @click="update"
      >Update
    </v-btn>
    <div>
      <v-btn
        class="my-16 paleteal--text float-right"
        color="#a11603"
        @click="logout"
        >Logout
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import store from "@/store";
import { functions } from "@/services/functions";
import UserService from "@/services/UserService";

export default {
  computed: {
    functions() {
      return functions;
    },
  },
  data() {
    return {
      email: store.state.email,
      name: store.state.name,
      passwordHash: store.state.passwordHash,
      graduationYear: store.state.graduationYear,
      oldPassword: "",
      newPassword: "",
      newPasswordRetyped: "",
    };
  },
  methods: {
    store() {
      return store;
    },
    logout() {
      store.commit("logout");
      this.$toasted.show("Logged out.", {
        type: "success",
        theme: "bubble",
        position: "top-center",
      });
    },
    async update() {
      if (
        !store.state.isAdmin &&
        ((this.oldPassword !== "" &&
          (await functions.getSHA256Hash(this.oldPassword)) ===
            this.passwordHash) ||
          (this.oldPassword === "" && this.newPassword === "")) &&
        functions.isGraduationYearValid(this.graduationYear) &&
        this.graduationYear !== "" &&
        this.name !== ""
      ) {
        await UserService.updateStudent({
          email: this.email,
          name: this.name,
          passwordHash:
            this.newPassword === this.newPasswordRetyped &&
            this.newPassword !== ""
              ? await functions.getSHA256Hash(this.newPassword)
              : this.passwordHash,
          graduationYear: this.graduationYear,
        });

        store.commit("login", {
          email: this.email,
          name: this.name,
          passwordHash:
            this.newPassword === this.newPasswordRetyped &&
            this.newPassword !== ""
              ? await functions.getSHA256Hash(this.newPassword)
              : this.passwordHash,
          graduationYear: this.graduationYear,
        });

        this.passwordHash = store.state.passwordHash;
        this.oldPassword = "";
        this.newPassword = "";
        this.newPasswordRetyped = "";

        this.$toasted.show("Details updated successfully.", {
          type: "success",
          theme: "bubble",
          position: "top-center",
        });
      } else if (
        store.state.isAdmin &&
        ((this.oldPassword !== "" &&
          (await functions.getSHA256Hash(this.oldPassword)) ===
            this.passwordHash) ||
          (this.oldPassword === "" && this.newPassword === "")) &&
        this.name !== ""
      ) {
        await UserService.updateAdmin({
          email: this.email,
          name: this.name,
          passwordHash:
            this.newPassword === this.newPasswordRetyped &&
            this.newPassword !== ""
              ? await functions.getSHA256Hash(this.newPassword)
              : this.passwordHash,
        });

        store.commit("adminLogin", {
          email: this.email,
          name: this.name,
          passwordHash:
            this.newPassword === this.newPasswordRetyped &&
            this.newPassword !== ""
              ? await functions.getSHA256Hash(this.newPassword)
              : this.passwordHash,
        });

        this.passwordHash = store.state.passwordHash;
        this.oldPassword = "";
        this.newPassword = "";
        this.newPasswordRetyped = "";

        this.$toasted.show("Details updated successfully.", {
          type: "success",
          theme: "bubble",
          position: "top-center",
        });
      } else {
        this.$toasted.show(
          "Please ensure that your current password is input correctly and the other details are valid.",
          {
            type: "error",
            theme: "bubble",
            position: "top-center",
          }
        );
      }
    },
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
