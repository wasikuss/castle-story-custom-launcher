import {
  contextBridge,
  ipcMain,
  IpcMainInvokeEvent,
  ipcRenderer,
  shell,
} from "electron";
import { platform } from "os";
import { MainWindowRef } from "../../shared/mainWindowRef";
import type { IPCWrapperForFunction, Launcher } from "../../src/types";
import { CastleStory } from "./CastleStory";
import { ConfigFile } from "./ConfigFile";
import { store } from "./electron-store";
import { getSupportedResolutins } from "./getSupportedResolutions";

enum IPC {
  CastleStoryInstance_check = "CastleStoryInstance_check",
  CastleStoryInstance_launch = "CastleStoryInstance_launch",
  os_platform = "os_platform",
  openExternal = "openExternal",
  getSupportedResolutions = "getSupportedResolutions",
  mainWindow_minimize = "mainWindow_minimize",
  mainWindow_quit = "mainWindow_quit",
}

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

const triples: [
  IPC,
  (...args: any[]) => any,
  () => void
][] = [
  wrapWithIpc(IPC.os_platform, platform),
  wrapWithIpc(IPC.openExternal, shell.openExternal),
  wrapWithIpc(IPC.getSupportedResolutions, getSupportedResolutins),
];

const pushWindowBasedIpcs = (windowRef: MainWindowRef, CastleStoryInstance?: CastleStory) => {
  triples.push(wrapWithIpc(IPC.mainWindow_minimize, () => {
    windowRef.current.minimize();
  }));
  triples.push(wrapWithIpc(IPC.mainWindow_quit, () => {
    windowRef.current.close();
  }));
  triples.push(wrapWithIpc(IPC.CastleStoryInstance_check, () => CastleStoryInstance.check()));
  triples.push(wrapWithIpc(IPC.CastleStoryInstance_launch, () => CastleStoryInstance.launch(store)));
}

export const registerLauncherNamespace = (windowRef: MainWindowRef, CastleStoryInstance: CastleStory, configFile: ConfigFile) => {
  pushWindowBasedIpcs(windowRef, CastleStoryInstance);
  triples.forEach(([, , setupPart]) => setupPart());
  ipcMain.handle("__getConfigFileContent", () => configFile.content)
};

const preloadCheck = <O extends Record<string, unknown>, K extends keyof O>(
  scanned: O,
  key: K,
  scannedName: string,
) => {
  if (key in scanned) return;
  throw new Error(`${key as string} is not a member of ${scannedName}`);
};

export const preload = async () => {
  pushWindowBasedIpcs({ current: null });
  const launcherApi: Launcher = triples.reduce((prev, [name, wrapper]) => ({
    ...prev,
    [name]: wrapper,
  }), {} as Launcher); // preloadChecks are making it legal to use "as" here

  preloadCheck(launcherApi, "CastleStoryInstance_check", "launcherApi");
  preloadCheck(launcherApi, "CastleStoryInstance_launch", "launcherApi");
  preloadCheck(launcherApi, "os_platform", "launcherApi");
  preloadCheck(launcherApi, "openExternal", "launcherApi");
  preloadCheck(launcherApi, "getSupportedResolutions", "launcherApi");
  preloadCheck(launcherApi, "mainWindow_minimize", "launcherApi");
  preloadCheck(launcherApi, "mainWindow_quit", "launcherApi");

  contextBridge.exposeInMainWorld("launcher", launcherApi);

  const configFileContent = await ipcRenderer.invoke("__getConfigFileContent");
  contextBridge.exposeInMainWorld("config", configFileContent);
};
