import { createRouter, createWebHashHistory } from "vue-router";
import index from "./pages/IndexPage.vue";
import bewaard from "./pages/BewaardPage.vue";
import account from "./pages/AccountPage.vue";
import home from "./pages/HomePage.vue";
// import login from "./pages/LoginPage.vue";

const routes = [
  { path: "/", component: index },
  // { path: "/login", component: login},
  { path: "/bewaard", component: bewaard},
  { path: "/account", component: account},
  { path: "/home", component: home}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;