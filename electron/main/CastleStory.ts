import * as OS from "os";
import { join } from "path";
import { existsSync, accessSync, constants } from "fs-extra";
import { spawn } from "child_process";
import type { MainWindowRef } from "../../shared/mainWindowRef";
import type Store from "electron-store";
import type { StoreType } from "../../shared/store";
import type { Check } from "../../shared/types";

export class CastleStory {
  gameHandle: ReturnType<typeof spawn> | null = null;

  constructor (public windowRef: MainWindowRef) {}
  
  isModded = () => {
    return false;
  }

  check = (): Check => {
    const path = this.getFullPath();
    try {
      if (existsSync(path)) {
        accessSync(path, constants.X_OK);
      } else {
        return {
          scannedFile: path,
          exists: false,
          access: false
        } as const;
      }
    } catch (err) {
      return {
        scannedFile: path,
        exists: true,
        access: false
      } as const;
    }
    return {
      scannedFile: path,
      exists: true,
      access: true
    } as const;
  }

  getPath = () => {
    return process.env.CASTLE_STORY_DIRECTORY;
  }

  getExecutableName = () => {
    const platform = OS.platform();
    const isModded = this.isModded();

    // TODO: Mac?
    if (isModded) {
      switch (platform) {
        case "win32": return "Castle Story.exe";
        case "linux": return "run_bepinex.sh";
        default: return "Castle Story.exe";
      }
    }
  
    // TODO: Mac?
    switch (platform) {
      case "win32": return "Castle Story.exe";
      case "linux": return "Castle Story";
      default: return "Castle Story.exe";
    }
  }

  getFullPath = () => {
    return join(this.getPath(), this.getExecutableName());
  }

  getRunParams = (store: Store<StoreType>) => {
    // TODO: rewrite this part
    const resolution = store.get("lastResolution");
    const windowMode = store.get("lastWindowMode");
    const adapter = store.get("lastAdapter"); // monitor
    const [width, height] = resolution.split("x");
    const fullscreen = windowMode === "fullscreen";
    const borderless = windowMode === "borderless";
  
    return [
      "",
      "-screen-width", `${width}`,
      "-screen-height", `${height}`,
      "-screen-fullscreen", `${fullscreen}`,
      borderless ? "-popupwindow" : "",
      "-adapter", `${adapter}`
    ];
  }

  launch (store: Store<StoreType>) {
    const isModded = false;
    const platform = OS.platform();
    const castleStoryPath = this.getPath();
    const executableName = this.getExecutableName();
    const runParams = this.getRunParams(store);
    const cwd = castleStoryPath;

    try {
      if (platform === "linux" && isModded) {
        this.gameHandle = spawn(
          "/bin/sh",
          [
            executableName,
            "", // skipping the first parameter for BepInEx
            ...runParams
          ],
          {
            detached: true,
            cwd
          }
        );
      } else {
        this.gameHandle = spawn(
          `${cwd}/${executableName}`,
          runParams,
          {
            detached: true,
            cwd
          }
        );
      }

      this.gameHandle.on("spawn", () => this.windowRef.current.webContents.send("game-start"));
      this.gameHandle.on("close", () => this.windowRef.current.webContents.send("game-stop"));
    } catch (err) {
      console.error("Not being able to get handle is expected", err);
    }
  }
}
