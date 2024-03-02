// main.js
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router.js";
import Type from "./components/Type.vue";

const app = createApp(App);

app.component("Type", Type);

app.use(router).mount("#app");