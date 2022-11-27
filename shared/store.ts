export type WindowMode = "window" | "borderless" | "fullscreen";
export type SkipLauncher = "always" | "never"; // I expect it to could be longer
export type StoreType = {
  userResolutions: Record<string, string>;
  lastResolution: string;
  lastWindowMode: WindowMode;
  lastSkipLauncher: SkipLauncher;
  lastAdapter: number;
};
