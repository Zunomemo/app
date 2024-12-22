import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

import App from "./App.vue";
// import "./styles/index.scss";

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

createApp(App)
    .use(router)
    .mount("#app");
