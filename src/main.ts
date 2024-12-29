import "reflect-metadata";
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import started from "electron-squirrel-startup";
import { startDatabase } from "./database";

if (started) {
    app.quit();
}

const createWindow = () => {
    startDatabase();

    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        titleBarStyle: "hidden",
        show: false,
        // note : enabling this option will make it impossible for the user to resize the window on the corners or edge of the screen.
        // transparent: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.on("unmaximize", () => {
        mainWindow.webContents.send("window-state-update", { maximized: false });
    });

    mainWindow.on("maximize", () => {
        mainWindow.webContents.send("window-state-update", { maximized: true });
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    }
    else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.webContents.send("window-state-update", { maximized: mainWindow.isMaximized() });
    ipcMain.on("window-action-invoke", (e, arg) => {
        if (arg.action === "maximize") {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize();
            }
            else {
                mainWindow.maximize();
            }
        }

        if (arg.action === "minimize") {
            mainWindow.minimize();
        }

        if (arg.action === "close") {
            mainWindow.close();
        }
    });
};

app.on("ready", async () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
