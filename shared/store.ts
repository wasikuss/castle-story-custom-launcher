export type WindowMode = "window" | "borderless" | "fullscreen_borderless" | "fullscreen";
export type SkipLauncher = "always" | "never"; // I expect it to could be longer
export type StoreType = {
  lastResolution: string;
  lastWindowMode: WindowMode;
  lastSkipLauncher: SkipLauncher;
};
