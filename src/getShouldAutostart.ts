import { store } from "./Store";

const launcherStartupTime = Date.now();
const MINUTE = 60 * 1_000;
type CheckAutostart = {
  prevent: boolean;
  error: boolean;
  message: string[];
};

export const getShouldAutostart = (): CheckAutostart => {
  const lastGameStartupTime = store.get("lastGameStartupTime");
  const lastSkipLauncher = store.get("lastSkipLauncher");
  const doesUserWantAutostart = lastSkipLauncher !== "never";
  const ignoreAssumingCrash = lastSkipLauncher === "always_force";
  const ignoreAutostart = window.config.DISABLE_AUTOSTART;

  console.log(ignoreAutostart);

  if (ignoreAutostart) {
    return {
      prevent: true,
      error: doesUserWantAutostart,
      message: ["You are ignoring autostart by the config file"],
    };
  }

  if (lastGameStartupTime === -1) {
    // if launcher was never started - ignore autostart
    return {
      prevent: true,
      error: doesUserWantAutostart,
      message: doesUserWantAutostart
        ? [
          "You are running the launcher for the first time.",
          "Autostart was ignored!",
        ]
        : [
          "You are running the launcher for the first time",
        ],
    };
  }

  if (!doesUserWantAutostart) {
    return {
      prevent: true,
      error: false,
      message: ["You don't want to autostart"],
    };
  }

  const frequentGameStart =
    lastGameStartupTime + 5 * MINUTE <= launcherStartupTime;
  if (!ignoreAssumingCrash && frequentGameStart) {
    // if user is restarting the game frequently (in last 5 min)
    // prevent autostart
    return {
      prevent: true,
      error: true,
      message: [
        "Your last game start was less than 5 minutes ago.",
        "Ignoring autostart, you can disable this by",
        "setting autostart to 'Always (force)'",
      ],
    };
  }

  return {
    prevent: false,
    error: false,
    message: ["Game autostarts"],
  };
};
