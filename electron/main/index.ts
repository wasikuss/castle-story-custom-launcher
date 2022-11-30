import { config } from "dotenv";

if (!app.isPackaged) {
  config();
}

process.env.CASTLE_STORY_DIRECTORY = process.env.CASTLE_STORY_DIRECTORY || ".";
process.env.DIST_ELECTRON = app.isPackaged
  ? join(__dirname, "../..")
  : join(__dirname, "..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, "../public");
import { CastleStory } from "./CastleStory";

import { registerMainStoreEvents } from "./electron-store";
import { windowRef } from "./windowRef";
const CastleStoryInstance = new CastleStory(windowRef);
registerMainStoreEvents();

import { app, BrowserWindow, ipcMain, shell } from "electron";
import { release } from "os";
import { join } from "path";

import { registerLauncherNamespace } from "./registerLauncherNamespace";
registerLauncherNamespace(windowRef, CastleStoryInstance);

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

function createWindow() {
  windowRef.current = new BrowserWindow({
    title: "Castle Story",
    icon: join(process.env.PUBLIC, "favicon.svg"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: true,
    },
    fullscreenable: false,
    acceptFirstMouse: true,
    backgroundColor: "#000",
    center: true,
    frame: false,
    show: true,
    movable: true,
    width: 1280,
    height: 745,
    resizable: false
  });

  // win.webContents.addWorkSpace

  if (app.isPackaged) {
    windowRef.current.loadFile(indexHtml);
  } else {
    windowRef.current.loadURL(url);
    // win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  windowRef.current.webContents.on("did-finish-load", () => {
    windowRef.current?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  windowRef.current.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  windowRef.current = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (windowRef.current) {
    // Focus on the main window if the user tried to open another
    if (windowRef.current.isMinimized()) windowRef.current.restore();
    windowRef.current.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});
