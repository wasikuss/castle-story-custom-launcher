import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("game", {
  start: (callback: () => void) => ipcRenderer.on("game-start", callback),
  stop: (callback: () => void) => ipcRenderer.on("game-stop", callback),
});
