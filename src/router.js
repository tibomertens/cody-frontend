import { createRouter, createWebHistory } from "vue-router";
import bewaard from "./components/pages/SavedPage.vue";
import account from "./components/pages/AccountPage.vue";
import home from "./components/pages/HomePage.vue";
import login from "./components/pages/LoginPage.vue"; // no navigation
import berekenIndicatief from "./components/pages/TestPage.vue"; // no navigation
import sideNav from "./components/shared/SideNav.vue";
import topNav from "./components/shared/TopNav.vue";
import Projects from "./components/pages/ProjectsPage.vue";
import checklist from "./components/pages/ChecklistPage.vue";
import Settings from "./components/pages/SettingsPage.vue";
import promotors from "./components/pages/PromotorsPage.vue";
import DetermineLabelChoicePage from "./components/pages/DetermineLabelChoicePage.vue";
import RenovationDetailPage from "./components/pages/RenovationDetailsPage.vue";
import RegisterPage from "./components/pages/RegisterPage.vue";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage.vue";

const routes = [
  {
    path: "/",
    components: { default: home, sidebar: sideNav, topNav: topNav },
    name: "Dashboard",
    meta: { title: "Cody | Dashboard", sidebar: true },
  },
  {
    path: "/account",
    components: { default: account, sidebar: sideNav, topNav: topNav },
    name: "Account",
    meta: { title: "Cody | Account", sidebar: true },
  },
  {
    path: "/login",
    components: { default: login },
    meta: { title: "Cody | Inloggen", sidebar: false },
  },
  {
    path: "/determinelabelchoice",
    components: { default: DetermineLabelChoicePage },
    meta: { title: "Cody | Registreren", sidebar: false },
  },
  {
    path: "/test/berekenIndicatief",
    components: { default: berekenIndicatief },
    meta: { title: "Cody | Registreren", sidebar: false },
  },
  {
    path: "/rapport/berekenIndicatief",
    components: { default: berekenIndicatief },
    meta: { title: "Cody | Registreren", sidebar: false },
  },
  {
    path: "/rapport/checklist",
    components: { default: checklist },
    meta: { title: "Cody | Registreren", sidebar: false },
  },
  {
    path: "/projects",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    name: "Projecten",
    meta: { title: "Cody | Projecten", sidebar: true },
  },
  {
    path: "/projects/recommended",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    name: "Aanbevolen projecten",
    meta: { title: "Cody | Projecten", sidebar: true },
  },
  {
    path: "/projects/active",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    name: "Actieve projecten",
    meta: { title: "Cody | Projecten", sidebar: true },
  },
  {
    path: "/projects/completed",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    name: "Afgeronde projecten",
    meta: { title: "Cody | Projecten", sidebar: true },
  },
  {
    path: "/projects/saved",
    components: { default: Projects, sidebar: sideNav, topNav: topNav },
    name: "Opgeslagen projecten",
    meta: { title: "Cody | Projecten", sidebar: true },
  },
  {
    path: "/projects/:id",
    components: {
      default: RenovationDetailPage,
      sidebar: sideNav,
      topNav: topNav,
    },
    name: "Renovatiedetails",
    meta: { title: "Cody | Project details", sidebar: true },
  },
  {
    path: "/settings",
    components: { default: Settings, sidebar: sideNav, topNav: topNav },
    name: "Instellingen",
    meta: { title: "Cody | Instellingen", sidebar: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: "/",
  },
  {
    path: "/promotors",
    components: { default: promotors, sidebar: sideNav, topNav: topNav },
    name: "Renovatoren",
    meta: { title: "Cody | Renovatoren", sidebar: true },
  },
  {
    path: "/register",
    components: { default: RegisterPage },
    meta: { title: "Cody | Registreren", sidebar: false },
  },
  {
    path: "/forgotpassword",
    components: { default: ForgotPasswordPage },
    meta: { title: "Cody | Wachtwoord vergeten", sidebar: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
