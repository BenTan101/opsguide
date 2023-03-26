import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  isLoggedIn: false,
  email: "",
  name: "",
  passwordHash: "",
  graduationYear: 0,
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
    },
    logout() {
      state.isLoggedIn = false;
      state.email = "";
      state.name = "";
      state.passwordHash = "";
      state.graduationYear = 0;
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
