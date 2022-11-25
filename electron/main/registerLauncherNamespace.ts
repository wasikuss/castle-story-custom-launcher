import {
  contextBridge,
  ipcMain,
  IpcMainInvokeEvent,
  ipcRenderer,
  shell,
} from "electron";
import { platform } from "os";
import { spawn as launch } from "child_process";
import type { IPCWrapperForFunction, Launcher } from "../../src/types";
import { getSupportedResolutins } from "./getSupportedResolutions";

enum IPC {
  launch = "launch",
  env_castlestorypath = "env_castlestorypath",
  os_platform = "os_platform",
  openExternal = "openExternal",
  getSupportedResolutions = "getSupportedResolutions",
}

const getEnvCastleStoryPath = () => process.env.CASTLE_STORY_DIRECTORY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wrapWithIpc = <F extends (...args: any[]) => any>(name: IPC, func: F) => {
  type Wrapper = IPCWrapperForFunction<F>;
  // type WrapperParams = Parameters<Wrapper>;

  const handlePart = async (event: IpcMainInvokeEvent, args: string) => {
    try {
      const parsedArgs = JSON.parse(args);
      return await func(...parsedArgs);
    } catch (_) { // expected
      return await func();
    }
  }

  return [
    name,
    (...args) => {
      console.log("Invoking", name, "with", args);
      return ipcRenderer.invoke(name, JSON.stringify(args));
    },
    () => ipcMain.handle(name, handlePart),
  ] as [
    IPC,
    Wrapper,
    () => void,
  ];
};

const triples = [
  wrapWithIpc(IPC.launch, launch),
  wrapWithIpc(IPC.env_castlestorypath, getEnvCastleStoryPath),
  wrapWithIpc(IPC.os_platform, platform),
  wrapWithIpc(IPC.openExternal, shell.openExternal),
  wrapWithIpc(IPC.getSupportedResolutions, getSupportedResolutins),
];

export const registerLauncherNamespace = () => {
  triples.forEach(([, , setupPart]) => setupPart());
};

const preloadCheck = <O extends Record<string, unknown>, K extends keyof O>(
  scanned: O,
  key: K,
  scannedName: string,
) => {
  if (key in scanned) return;
  throw new Error(`${key as string} is not a member of ${scannedName}`);
};

export const preload = () => {
  const launcherApi: Launcher = triples.reduce((prev, [name, wrapper]) => ({
    ...prev,
    [name]: wrapper,
  }), {} as Launcher); // preloadChecks are making it legal to use "as" here

  preloadCheck(launcherApi, "launch", "launcherApi");
  preloadCheck(launcherApi, "env_castlestorypath", "launcherApi");
  preloadCheck(launcherApi, "os_platform", "launcherApi");
  preloadCheck(launcherApi, "openExternal", "launcherApi");
  preloadCheck(launcherApi, "getSupportedResolutions", "launcherApi");

  contextBridge.exposeInMainWorld("launcher", launcherApi);
};
