import { ipcMain } from "electron";
import Store from "electron-store";
import type { StoreType } from "../../shared/store";

export const store = new Store<StoreType>({
  defaults: {
    userResolutions: {},
    lastGameStartupTime: -1,
    lastResolution: "1024x768",
    lastSkipLauncher: "never",
    lastWindowMode: "window",
    lastAdapter: 0,
  },
	beforeEachMigration: (store, context) => {
		console.log(`[config] migrate from ${context.fromVersion} → ${context.toVersion}`);
	},
  migrations: {
    "0.0.3": store => { store.set("lastGameStartupTime", -1) }
  },
});

export const registerMainStoreEvents = () => {
  // IPC listener
  ipcMain.on("electron-store-get", async (event, val) => {
    event.returnValue = store.get(val);
  });

  ipcMain.on("electron-store-set", async (event, key, val) => {
    store.set(key, val);
  });
};
