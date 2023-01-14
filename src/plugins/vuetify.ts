import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3ca073",
        secondary: "#00a499",
        green: "#3ca073",
        teal: "#00a499",
        lightteal: "#b5f0ec",
        paleteal: "#e5ecea",
        dark: "#333f48",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});
