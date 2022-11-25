import { StoreType } from "../shared/store";

declare global {
  interface Window {
    electron: {
      store: {
        get: <K extends keyof StoreType>(key: K) => StoreType[K];
        set: <K extends keyof StoreType>(key: K, val: StoreType[K]) => void;
        // any other methods you've defined...
      };
    };
  }
}

export const store = window.electron.store;
export type { StoreType };