<template>
  <v-container class="pa-16">
    <h1>Login</h1>

    <v-container class="py-8">
      <v-text-field label="Email" filled v-model="email"></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        filled
        v-model="password"
      ></v-text-field>
      <v-btn class="mt-2 paleteal--text" color="#00a499" @click="login"
        >Login
      </v-btn>
    </v-container>
    <h3 class="font-weight-light mt-8"><i>New? Register here.</i></h3>

    <v-container class="py-8">
      <v-text-field
        label="School email"
        filled
        v-model="signupEmail"
        :error-messages="
          this.signupEmail !== '' &&
          (!this.signupEmail.match(/h[0-9]+@nushigh\.edu\.sg/gi) ||
            this.signupEmail.length !== 23)
            ? ['Please enter a valid nushigh.edu.sg email address.']
            : []
        "
      ></v-text-field>
      <v-text-field label="Full name" filled v-model="name"></v-text-field>
      <v-text-field
        label="Year of graduation"
        filled
        v-model="graduationYear"
        :error-messages="
          this.graduationYear !== '' &&
          (!Number.isInteger(parseInt(this.graduationYear)) ||
            this.graduationYear < new Date().getFullYear() ||
            this.graduationYear > new Date().getFullYear() + 5)
            ? [
                `Year must be between ${new Date().getFullYear()} and ${
                  new Date().getFullYear() + 5
                }.`,
              ]
            : []
        "
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        filled
        v-model="signupPassword"
      ></v-text-field>
      <v-text-field
        label="Retype password"
        type="password"
        filled
        v-model="signupPasswordRetyped"
        :error-messages="
          this.signupPassword !== this.signupPasswordRetyped
            ? ['Passwords do not match.']
            : []
        "
      ></v-text-field>
      <v-btn class="mt-2 paleteal--text" color="#00a499" @click="signup"
        >Sign up</v-btn
      >
    </v-container>
  </v-container>
</template>

<script>
import UserService from "@/services/UserService.js";
import store from "@/store";

export default {
  data() {
    return {
      email: "",
      password: "",
      signupEmail: "",
      name: "",
      signupPassword: "",
      signupPasswordRetyped: "",
      graduationYear: "",
    };
  },
  methods: {
    getSHAa256Hash: async function (input) {
      const textAsBuffer = new TextEncoder().encode(input);
      const hashBuffer = await window.crypto.subtle.digest(
        "SHA-256",
        textAsBuffer
      );
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray
        .map((item) => item.toString(16).padStart(2, "0"))
        .join("");
    },
    login: async function () {
      this.error = null;
      try {
        const response = await UserService.login({
          email: this.email,
          passwordHash: await this.getSHAa256Hash(this.password),
        });

        const name = response[0]["name"];
        const graduationYear = parseInt(response[0]["graduationYear"]);

        if (name !== "" && graduationYear !== 0) {
          store.commit("login");
          store.commit("setName", name);
          store.commit("setGraduationYear", graduationYear);

          this.$toasted.show("Login successful.", {
            type: "success",
            theme: "bubble",
            position: "top-center",
          });
        }
      } catch (error) {
        this.error = error.toString();
        this.$toasted.show("Login invalid.", {
          type: "error",
          theme: "bubble",
          position: "top-center",
        });
      }
    },
    signup: async function () {
      // Check all field are non-empty
      if (
        this.signupEmail === "" ||
        this.name === "" ||
        this.graduationYear === "" ||
        this.signupPassword === "" ||
        this.signupPasswordRetyped === ""
      ) {
        this.$toasted.show(
          "Please fill up all fields before creating an account.",
          {
            type: "error",
            theme: "bubble",
            position: "top-center",
          }
        );
        return;
      }

      // Validation before signing up
      if (
        !this.signupEmail.match(/h[0-9]+@nushigh\.edu\.sg/gi) ||
        this.signupEmail.length !== 23
      )
        return;
      if (
        this.graduationYear !== "" &&
        (!Number.isInteger(parseInt(this.graduationYear)) ||
          this.graduationYear < new Date().getFullYear() ||
          this.graduationYear > new Date().getFullYear() + 5)
      )
        return;
      if (this.signupPassword !== this.signupPasswordRetyped) return;

      console.log(
        this.signupEmail,
        this.name,
        this.signupPassword,
        this.graduationYear
      );

      this.error = null;
      try {
        // Signup
        if (
          (await UserService.isStudent({ email: this.signupEmail })).length !==
          0
        ) {
          this.$toasted.show(
            "There is already an account associated with this email.",
            {
              type: "error",
              theme: "bubble",
              position: "top-center",
            }
          );
          return;
        }

        const signupResult = await UserService.signup({
          email: this.signupEmail,
          name: this.name,
          passwordHash: await this.getSHAa256Hash(this.signupPassword),
          graduationYear: this.graduationYear,
        });

        console.log(signupResult);
        console.log(
          this.signupEmail,
          await this.getSHAa256Hash(this.signupPassword)
        );

        // Login
        const response = await UserService.login({
          email: this.signupEmail,
          passwordHash: await this.getSHAa256Hash(this.signupPassword),
        });

        console.log(response);

        this.name = response[0]["name"];
        this.graduationYear = parseInt(response[0]["graduationYear"]);

        if (this.name !== "" && this.graduationYear !== 0) {
          store.commit("login");
          store.commit("setName", this.name);
          store.commit("setGraduationYear", this.graduationYear);

          this.$toasted.show("Account created successfully.", {
            type: "success",
            theme: "bubble",
            position: "top-center",
          });
        }
      } catch (error) {
        this.error = error.toString();

        this.$toasted.show("Error in creating account.", {
          type: "error",
          theme: "bubble",
          position: "top-center",
        });
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #3ca073;
}
</style>
