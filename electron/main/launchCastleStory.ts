import * as OS from "os";
import { spawn } from "child_process";
import { store } from "./electron-store";
import { ipcRenderer } from "electron";
import { MainWindowRef } from "../../shared/mainWindowRef";

const getCastleStoryExecutable = (platform: string, isModded: boolean) => {
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

const getGameParams = () => {
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

let gameHandle: ReturnType<typeof spawn> | null = null;
export const launchCastleStory = (windowRef: MainWindowRef) => () => {
  const platform = OS.platform();
  const isModded = false;
  const castleStoryPath = process.env.CASTLE_STORY_DIRECTORY;
  const executableName = getCastleStoryExecutable(platform, isModded);

  const gameParams: string[] = getGameParams();

  const cwd = castleStoryPath;

  try {
    if (platform === "linux" && isModded) {
      gameHandle = spawn(
        "/bin/sh",
        [
          executableName,
          "", // skipping the first parameter for BepInEx
          ...gameParams
        ],
        {
          detached: true,
          cwd
        }
      );
    } else {
      gameHandle = spawn(
        `${cwd}/${executableName}`,
        gameParams,
        {
          detached: true,
          cwd
        }
      );
    }

    gameHandle.on("spawn", () => windowRef.current.webContents.send("game-start"));
    gameHandle.on("close", () => windowRef.current.webContents.send("game-stop"));
  } catch (err) {
    console.error("Not being able to get handle is expected", err);
  }
}
