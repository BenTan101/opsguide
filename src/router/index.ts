import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/opportunities",
    name: "opportunities",
    component: () => import("../views/OpportunitiesView.vue"),
  },
  {
    path: "/modules",
    name: "modules",
    component: () => import("../views/ModulesView.vue"),
  },
  {
    path: "/reviews",
    name: "reviews",
    component: () => import("../views/ReviewsView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginProfileView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
