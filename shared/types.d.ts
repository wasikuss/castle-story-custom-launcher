export type Resolution = {
  height: number;
  width: number;
  aspect: number;
  aspectLabel: string;
};

export type ConfigFileT = {
  DISABLE_AUTOSTART: boolean;
}

export type Check = {
  scannedFile: string;
  exists: boolean;
  access: boolean;
};
