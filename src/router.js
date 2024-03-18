import { createRouter, createWebHashHistory } from "vue-router";
import bewaard from "./components/pages/SavedPage.vue";
import account from "./components/pages/AccountPage.vue";
import home from "./components/pages/HomePage.vue";
import login from "./components/pages/LoginPage.vue"; // no navigation
import test from "./components/pages/TestPage.vue"; // no navigation
import sideNav from "./components/shared/SideNav.vue";
import topNav from "./components/shared/TopNav.vue";
import Projects from "./components/pages/ProjectsPage.vue";
import checklist from "./components/pages/ChecklistPage.vue";

const routes = [
  {
    path: "/",
    components: { default: home, sidebar: sideNav, topNav: topNav },
    meta: { sidebar: true },
  },
  {
    path: "/saved",
    components: { default: bewaard, sidebar: sideNav, topNav: topNav },
    meta: { sidebar: true },
  },
  {
    path: "/account",
    components: { default: account, sidebar: sideNav, topNav: topNav },
    meta: { sidebar: true },
  },
  { path: "/login", components: { default: login }, meta: { sidebar: false } },
  { path: "/test", components: { default: test }, meta: { sidebar: false } },
  { path: "/checklist", components: { default: checklist }, meta: { sidebar: false } },
  {
    path: "/projects",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    meta: { sidebar: true },
  },
  {
    path: "/projects/recommended",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    meta: { sidebar: true },
  },
  {
    path: "/projects/active",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    meta: { sidebar: true },
  },
  {
    path: "/projects/completed",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    meta: { sidebar: true },
  },
  {
    path: "/projects/saved",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    meta: { sidebar: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
