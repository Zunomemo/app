import { ConfigEnv, defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VueRouterAutoImports } from "unplugin-vue-router";
import unfonts from "unplugin-fonts/vite";
import autoImport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import vueRouter from "unplugin-vue-router/vite";
import { pluginExposeRenderer } from "./vite.base.config";
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";

export default defineConfig((env) => {
    const forgeEnv = env as ConfigEnv<"renderer">;
    const { root, mode, forgeConfigSelf } = forgeEnv;
    const name = forgeConfigSelf.name ?? "";

    return {
        root,
        mode,
        base: "./",
        build: {
            outDir: `.vite/renderer/${name}`
        },
        plugins: [
            pluginExposeRenderer(name),
            vue(),
            autoImport({
                dts: true,
                resolvers: [HeadlessUiResolver()],
                imports: [
                    "vue",
                    VueRouterAutoImports
                ]
            }),
            unfonts({
                google: {
                    families: ["Montserrat", "Inter"]
                }
            }),
            components({
                dts: true,
                resolvers: [HeadlessUiResolver()]
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
            })
        ],
        resolve: {
            preserveSymlinks: true
        },
        clearScreen: false
    } as UserConfig;
});
