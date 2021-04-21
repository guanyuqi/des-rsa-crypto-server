import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: '/generate',
    children: [
      {
        path: "generate",
        name: "Generate",
        component: () =>
          import("../components/Generate.vue"),
      },
      {
        path: "encrypt",
        name: "Encrypt",
        component: () =>
          import("../components/Encrypt.vue"),
      },
      {
        path: "decrypt",
        name: "Decrypt",
        component: () =>
          import("../components/Decrypt.vue"),
      },
    ]
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
