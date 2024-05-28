import { createRouter, createWebHistory } from "vue-router";
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
import AdminLoginPage from "./components/pages/AdminLoginPage.vue";
import AdminDashboard from "./components/pages/AdminDashboard.vue";
import Reviews from "./components/pages/ReviewPage.vue";
import CreateReview from "./components/pages/CreateReviewPage.vue";
import ChangeReview from "./components/pages/ChangeReviewPage.vue";
import RegisterPage from "./components/pages/RegisterPage.vue";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage.vue";
import ResetPasswordPage from "./components/pages/ResetPasswordPage.vue";
import PromotorSubscriptionPage from "./components/pages/PromotorSubscriptionPage.vue";
import PromotorsAdminPage from "./components/pages/PromotorsAdminPage.vue";

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
  {
    path: "/resetpassword",
    components: { default: ResetPasswordPage },
    meta: { title: "Cody | Wachtwoord veranderen", sidebar: false },
  },
  {
    path: "/promotors/subscription",
    components: { default: PromotorSubscriptionPage },
    meta: { title: "Cody | Subscriptie aanvragen", sidebar: false },
  },
  {
    path: "/reviews/:id",  
    components: { default: Reviews, sidebar: sideNav, topNav: topNav },
    name: "Reviews",
    meta: { title: "Cody | Review", sidebar: true },
  },
  {
    path: "/reviews/create/:id",
    components: { default: CreateReview, sidebar: sideNav, topNav: topNav },
    name: "Schrijf een review",
    meta: { title: "Cody | Review aanmaken", sidebar: true },
  },
  {
    path: "/reviews/update/:id",
    components: { default: ChangeReview, sidebar: sideNav, topNav: topNav },
    name: "Pas je review aan",
    meta: { title: "Cody | Subscriptie aanpassen", sidebar: true },
  },
  {
    path: "/admin/login",
    components: { default: AdminLoginPage, topNav: topNav },
    meta: { title: "Cody | Admin login", sidebar: false },
  },
  {
    path: "/admin/dashboard",
    components: { default: AdminDashboard, sidebar: sideNav, topNav: topNav },
    name: "Admin Dashboard",
    meta: { title: "Cody | Admin dashboard", sidebar: true },
  },
  {
    path: "/admin/promotors/:id",
    components: { default: PromotorsAdminPage, sidebar: sideNav, topNav: topNav },
    name: "Renovator details",
    meta: { title: "Cody | Renovator details", sidebar: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: "/",
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;