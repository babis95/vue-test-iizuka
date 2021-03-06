import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./axios.js";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
