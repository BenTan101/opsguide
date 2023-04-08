import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  // TODO: Remove perma login
  isLoggedIn: true,
  email: "h1810070@nushigh.edu.sg",
  name: "Amelie",
  passwordHash:
    "d2c1fb884fe1eceb7abf4b4e9c834667d79cdf19f3f8ad34e94a6736c2571b5e",
  graduationYear: 0,
  isAdmin: true,
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
