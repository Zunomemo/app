/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />

declare global {
    namespace NodeJS {
        interface Process {
            viteDevServers: Record<string, import("vite").ViteDevServer>
        }
    }

    type VitePluginConfig = ConstructorParameters<typeof import("@electron-forge/plugin-vite").VitePlugin>[0];
}
