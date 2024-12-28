import { createApp, reactive } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

import App from "./App.vue";
import "./styles/index.scss";

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const { ipc } = window.electron;

export const windowStore = reactive({
    state: {
        maximized: false
    },
    actions: {
        maximize: () => {
            ipc.send("window-action-invoke", { action: "maximize" });
        },
        minimize: () => {
            ipc.send("window-action-invoke", { action: "minimize" });
        },
        close: () => {
            ipc.send("window-action-invoke", { action: "close" });
        }
    }
});

ipc.on("window-state-update", (_, arg) => {
    windowStore.state.maximized = arg.maximized;
});

createApp(App)
    .use(router)
    .mount("#app");
