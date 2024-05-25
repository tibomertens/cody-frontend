// main.js
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router.js";
import Type from "./components/UI/Type.vue";

const app = createApp(App);

app.component("Type", Type);

router.beforeEach((to, from, next) => {
  // Set document title
  document.title = to.meta.title || "Default Title - My App";
  next();
});

app.use(router).mount("#app");
