import { ConfigEnv, defineConfig, mergeConfig, UserConfig } from "vite";
import { getBuildDefine, external, pluginHotRestart, getBuildConfig } from "./vite.base.config";

export default defineConfig((env) => {
    const forgeEnv = env as ConfigEnv<"build">;
    const { forgeConfigSelf } = forgeEnv;
    const define = getBuildDefine(forgeEnv);

    const config: UserConfig = {
        build: {
            lib: {
                entry: forgeConfigSelf.entry!,
                fileName: () => "[name].js",
                formats: ["cjs"]
            },
            rollupOptions: {
                external
            }
        },
        plugins: [pluginHotRestart("restart")],
        define,
        resolve: {
            mainFields: ["module", "jsnext:main", "jsnext"]
        }
    };

    return mergeConfig(getBuildConfig(forgeEnv), config);
});
