import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  // TODO: Remove perma login
  isLoggedIn: true,
  email: "h1810017@nushigh.edu.sg",
  name: "Henry",
  passwordHash:
    "a950f30a7250cdaa104c6e74406bc6b7634b278ce6f62b53cfeba0d2e36d58dc",
  graduationYear: 2023,
  isAdmin: false,
};

export default new Vuex.Store({
  state: state,
  getters: {
    isLoggedIn() {
      return state.isLoggedIn;
    },
  },
  mutations: {
    login(state, details) {
      console.log("VOILA");
      console.log(details);
      state.isLoggedIn = true;
      state.email = details["email"];
      state.name = details["name"];
      state.passwordHash = details["passwordHash"];
      state.graduationYear = details["graduationYear"];
      state.isAdmin = false;
    },
    adminLogin(state, details) {
      console.log("VOILADMIN");
      console.log(details);
      state.isLoggedIn = true;
      state.email = details["email"];
      state.name = details["name"];
      state.passwordHash = details["passwordHash"];
      state.isAdmin = true;
    },
    logout() {
      state.isLoggedIn = false;
      state.email = "";
      state.name = "";
      state.passwordHash = "";
      state.graduationYear = 0;
      state.isAdmin = false;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setName(state, name) {
      state.name = name;
    },
    setPasswordHash(state, pw) {
      state.passwordHash = pw;
    },
    setGraduationYear(state, year) {
      state.graduationYear = year;
    },
  },
  actions: {},
  modules: {},
});
