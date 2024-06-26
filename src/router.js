import { createRouter, createWebHistory } from "vue-router";
import account from "./components/pages/AccountPage.vue";
import home from "./components/pages/HomePage.vue";
import login from "./components/pages/LoginPage.vue"; // no navigation
import berekenIndicatief from "./components/pages/TestPage.vue"; // no navigation
import sideNav from "./components/shared/SideNav.vue";
import topNav from "./components/shared/TopNav.vue";
import Projects from "./components/pages/ProjectsPage.vue";
import checklist from "./components/pages/ChecklistPage.vue";
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
import ExpensePage from "./components/pages/ExpensePage.vue";
import TermsOfUserPage from "./components/pages/TermsOfUsePage.vue";
import AccountDataPage from "./components/pages/AccountDataPage.vue";
import AccountEditPage from "./components/pages/AccountEditPage.vue";
import AccountChangePasswordPage from "./components/pages/AccountChangePasswordPage.vue";
import GoalEditPage from "./components/pages/GoalEditPage.vue";
import NotFound404Page from "./components/shared/404.vue";
import ConfirmEmailPage from "./components/pages/ConfirmEmailPage.vue";
import PrivacyPage from "./components/pages/PrivacyPage.vue";
import FAQPage from "./components/pages/FAQPage.vue";

const routes = [
  {
    path: "/",
    components: { default: home, sidebar: sideNav, topNav: topNav },
    name: "Dashboard",
    meta: { title: "Cody | Dashboard", sidebar: true },
  },
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/account",
    components: { default: account, sidebar: sideNav, topNav: topNav },
    name: "Account",
    meta: { title: "Cody | Account", sidebar: true },
  },
  {
    path: "/profile",
    redirect: "/",
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
    path: "/settings/account",
    components: { default: AccountDataPage, sidebar: sideNav, topNav: topNav },
    name: "Account instellingen",
    meta: { title: "Cody | account instellingen", sidebar: true },
  },
  {
    path: "/settings/account/edit",
    components: { default: AccountEditPage, sidebar: sideNav, topNav: topNav },
    name: "Account aanpassen",
    meta: { title: "Cody | account aanpassen", sidebar: true },
  },
  {
    path: "/settings/account/changepassword",
    components: {
      default: AccountChangePasswordPage,
      sidebar: sideNav,
      topNav: topNav,
    },
    name: "Wachtwoord aanpassen",
    meta: { title: "Cody | wachtwoord aanpassen", sidebar: true },
  },
  {
    path: "/settings/doel",
    components: { default: GoalEditPage, sidebar: sideNav, topNav: topNav },
    name: "Doel instellingen",
    meta: { title: "Cody | doel instellingen", sidebar: true },
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
    components: { default: AdminLoginPage },
    meta: { title: "Cody | Admin login", sidebar: false },
  },
  {
    path: "/admin/dashboard",
    components: { default: AdminDashboard, topNav: topNav },
    name: "Admin Dashboard",
    meta: { title: "Cody | Admin dashboard", sidebar: false },
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard",
  },
  {
    path: "/admin/promotors/:id",
    components: { default: PromotorsAdminPage, topNav: topNav },
    name: "Renovator details",
    meta: { title: "Cody | Renovator details", sidebar: false },
  },
  {
    path: "/account/expenses",
    components: { default: ExpensePage, sidebar: sideNav, topNav: topNav },
    name: "Uitgaven",
    meta: { title: "Cody | Uitgaven", sidebar: true },
  },
  {
    path: "/settings/terms-of-service",
    components: { default: TermsOfUserPage, sidebar: sideNav, topNav: topNav },
    name: "Gebruikersvoorwaarden",
    meta: { title: "Cody | Gebruikersvoorwaarden", sidebar: true },
  },
  {
    path: "/settings/privacy-policy",
    components: { default: PrivacyPage, sidebar: sideNav, topNav: topNav },
    name: "Privacy",
    meta: { title: "Cody | Privacy", sidebar: true },
  },
  {
    path: "/settings/faq",
    components: { default: FAQPage, sidebar: sideNav, topNav: topNav },
    name: "FAQ",
    meta: { title: "Cody | FAQ", sidebar: true },
  },
  {
    path: "/confirm/:token",
    components: { default: ConfirmEmailPage },
    name: "Bevestig account",
    meta: { title: "Cody | Bevestig account", sidebar: false },
  },
  {
    path: "/:catchAll(.*)",
    components: { default: NotFound404Page, sidebar: sideNav, topNav: topNav },
    name: "404",
    meta: { title: "Cody | 404", sidebar: true },
  },
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
  },
});

export default router;
