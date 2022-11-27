import { shell } from "electron";
import { platform } from "node:os";
import { Resolution } from "shared/resolution";

type LaunchParams = Parameters<typeof launch>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IPCWrapperForFunction<F extends (...args: any[]) => any> = ((...args: Parameters<F>) => Promise<ReturnType<F>>);

type Launcher = {
  launch: IPCWrapperForFunction<() => void>;
  os_platform: IPCWrapperForFunction<typeof platform>;
  openExternal: IPCWrapperForFunction<typeof shell["openExternal"]>;
  getSupportedResolutions: IPCWrapperForFunction<() => Resolution[]>;

  mainWindow_minimize: IPCWrapperForFunction<() => void>;
  mainWindow_quit: IPCWrapperForFunction<() => void>;
}

declare global {
  interface Window {
    launcher: Launcher;
    electron: {
      store: {
        get: <K extends keyof StoreType>(key: K) => StoreType[K];
        set: <K extends keyof StoreType>(key: K, val: StoreType[K]) => void;
        // any other methods you've defined...
      };
    };
    game: {
      start: (callback: () => void) => void;
      stop: (callback: () => void) =>  void;
    };
  }
}
