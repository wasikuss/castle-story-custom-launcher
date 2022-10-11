import { shell } from "electron";
import { platform } from "node:os";
import { spawn as launch } from "child_process";

type LaunchParams = Parameters<typeof launch>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IPCWrapperForFunction<F extends (...args: any[]) => any> = ((...args: Parameters<F>) => Promise<ReturnType<F>>);

type Launcher = {
  launch: IPCWrapperForFunction<typeof launch>;
  env_castlestorypath: IPCWrapperForFunction<() => string>;
  os_platform: IPCWrapperForFunction<typeof platform>;
  openExternal: IPCWrapperForFunction<typeof shell["openExternal"]>; 
}

declare global {
  interface Window {
    launcher: Launcher;
  }
}
