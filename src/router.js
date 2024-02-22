import { createRouter, createWebHashHistory } from "vue-router";
import index from "./pages/IndexPage.vue";
import login from "./pages/LoginPage.vue";

const routes = [
  { path: "/", component: index },
  { path: "/login", component: login }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;