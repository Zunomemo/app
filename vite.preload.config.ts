import { defineConfig } from "vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import autoImport from "unplugin-auto-import/vite";
import unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config
export default defineConfig({
    build: {
        lib: {
            entry: "src/main.ts",
            formats: ["es"],
            fileName: "preload"
        }
    },
    plugins: [
        unfonts({
            google: {
                families: ["Montserrat", "Inter"]
            }
        }),
        autoImport({
            dts: true,
            imports: [
                "vue",
                VueRouterAutoImports
            ]
        })
    ]
});
