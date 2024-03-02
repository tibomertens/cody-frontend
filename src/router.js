import { createRouter, createWebHashHistory } from "vue-router";
import bewaard from "./pages/BewaardPage.vue";
import account from "./pages/AccountPage.vue";
import home from "./pages/HomePage.vue";
import login from "./pages/LoginPage.vue"; // no navigation
import test from "./pages/TestPage.vue"; // no navigation
import sideNav from "./components/SideNav.vue";
import topNav from "./components/TopNav.vue";
// import everything from "./pages/EverythingPage.vue";
// import suggestions from "./pages/SuggestionsPage.vue";
// import inProgress from "./pages/InProgressPage.vue";
// import done from "./pages/DonePage.vue";
// import login from "./pages/LoginPage.vue";

const routes = [
  { path: "/", components: { default: home, sidebar: sideNav, topNav: topNav } },
  { path: "/bewaard", components: { default: bewaard, sidebar: sideNav, topNav: topNav } },
  { path: "/account", components: { default: account, sidebar: sideNav, topNav: topNav } },
  { path: "/login", components: { default: login } }, // no sidebar
  { path: "/test", components: { default: test } }, // no sidebar
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
