import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VueRouterAutoImports } from "unplugin-vue-router";
import autoImport from "unplugin-auto-import/vite";
import vueRouter from "unplugin-vue-router/vite";

export default defineConfig({
    plugins: [
        autoImport({
            dts: true,
            imports: [
                "vue",
                VueRouterAutoImports
            ]
        }),
        vueRouter({
            extensions: [".page.vue"],
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
        vue()
    ]
});
