import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueRouter from "unplugin-vue-router/vite";
import vueDevTools from "vite-plugin-vue-devtools";
import inspect from "vite-plugin-inspect";

// https://vitejs.dev/config
export default defineConfig({
    plugins: [
        vueRouter({
            extensions: [".page.vue", ".vue"],
            importMode: "async",
            routesFolder: [
                {
                    src: "./src/pages"
                }
            ],
            exclude: [
                "**/*.component.vue"
            ]
        }),
        vue(),
        // process.env.NODE_ENV === "development" && vueDevTools(),
        // process.env.NODE_ENV === "development" && inspect()
        vueDevTools(),
        // inspect()
    ]
});
