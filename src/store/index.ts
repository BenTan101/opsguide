import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  isLoggedIn: false,
  name: "",
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
    login() {
      state.isLoggedIn = true;
    },
    logout() {
      state.isLoggedIn = false;
      state.name = "";
      state.graduationYear = 0;
    },
    setName(state, name) {
      state.name = name;
    },
    setGraduationYear(state, year) {
      state.graduationYear = year;
    },
  },
  actions: {},
  modules: {},
});
