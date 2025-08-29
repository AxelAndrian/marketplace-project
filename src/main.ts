import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import "./style.css";
import App from "./App.vue";
import { router } from "../router";

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(autoAnimatePlugin).mount("#app");
