import { BrowserWindow } from "electron"

export type MainWindowRef = {
  current: BrowserWindow | null;
};
