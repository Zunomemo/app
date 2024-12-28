// See the Electron documentation for details on how to use preload scripts:
import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
    ipc: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        send: (channel: string, data: any) => {
            ipcRenderer.send(channel, data);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        on: (channel: string, callback: (event: any, data: any) => void) => {
            ipcRenderer.on(channel, (e, d) => callback(e, d));
        }
    }
});
