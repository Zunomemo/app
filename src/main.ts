import { fileURLToPath } from "url";
import { app, BrowserWindow, ipcMain } from "electron";
// import installExtension, { VUEJS_DEVTOOLS_BETA } from "electron-devtools-installer";
import path from "path";
import started from "electron-squirrel-startup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        titleBarStyle: "hidden",
        // note : enabling this option will make it impossible for the user to resize the window on the corners or edge of the screen.
        // transparent: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            nodeIntegration: true
        }
    });

    mainWindow.on("unmaximize", () => {
        mainWindow.webContents.send("window-state-update", { maximized: false });
    });

    mainWindow.on("maximize", () => {
        mainWindow.webContents.send("window-state-update", { maximized: true });
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    }
    else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

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

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", async () => {
    // await installExtension(VUEJS_DEVTOOLS_BETA, { loadExtensionOptions: { allowFileAccess: true } });

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
