import { ipcMain } from "electron";
import Store from "electron-store";
import type { StoreType } from "../../shared/store";

export const store = new Store<StoreType>({
  defaults: {
    lastResolution: "",
    lastSkipLauncher: "never",
    lastWindowMode: "window",
  }
});

// IPC listener
ipcMain.on("electron-store-get", async (event, val) => {
  event.returnValue = store.get(val);
});

ipcMain.on("electron-store-set", async (event, key, val) => {
  store.set(key, val);
});
