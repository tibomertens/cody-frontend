import { createRouter, createWebHashHistory } from "vue-router";
import bewaard from "./pages/BewaardPage.vue";
import account from "./pages/AccountPage.vue";
import home from "./pages/HomePage.vue";
import login from "./pages/LoginPage.vue"; // no navigation
import test from "./pages/TestPage.vue"; // no navigation
import sideNav from "./components/SideNav.vue";
import topNav from "./components/TopNav.vue";

const routes = [
  { path: "/", components: { default: home, sidebar: sideNav, topNav: topNav }, meta: { sidebar: true } },
  { path: "/bewaard", components: { default: bewaard, sidebar: sideNav, topNav: topNav }, meta: { sidebar: true } },
  { path: "/account", components: { default: account, sidebar: sideNav, topNav: topNav }, meta: { sidebar: true } },
  { path: "/login", components: { default: login }, meta: { sidebar: false } }, // no sidebar
  { path: "/test", components: { default: test }, meta: { sidebar: false } }, // no sidebar
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
