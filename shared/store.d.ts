export type WindowMode = "window" | "borderless" | "fullscreen";
export type SkipLauncher = "always" | "always_force" | "never"; // I expect it to could be longer
export type StoreType = {
  userResolutions: Record<string, string>;
  lastGameStartupTime: number;
  lastResolution: string;
  lastWindowMode: WindowMode;
  lastSkipLauncher: SkipLauncher;
  lastAdapter: number;
};
