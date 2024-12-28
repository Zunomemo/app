import { defineConfig } from "vite";
import unfonts from "unplugin-fonts/vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/preload.ts",
            formats: ["cjs"],
            fileName: "preload.cjs"
        },
        rollupOptions: {
            output: {
                format: "cjs",
                // note : stupid stupid stupid stupid
                entryFileNames: "[name].cjs"
            }
        }
    },
    plugins: [
        unfonts({
            google: {
                families: ["Montserrat", "Inter"]
            }
        })
    ]
});
