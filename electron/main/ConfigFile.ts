import { readFileSync } from "original-fs";
import { parse } from "dotenv";
import { join } from "path";
import type { ConfigFileT } from "../../shared/types";


export class ConfigFile {
  path: string;
  content: ConfigFileT;

  constructor (configPath?: string) {
    const defaultPath = join(process.env.CASTLE_STORY_DIRECTORY, "launcher.properties")
    this.path = configPath ?? defaultPath;
    console.log(configPath, defaultPath)
    try {
      const configFile = readFileSync(this.path);
      const rawContent = parse<Record<keyof ConfigFileT, string>>(configFile);
      this.content = {
        DISABLE_AUTOSTART: rawContent.DISABLE_AUTOSTART.includes("true")
      };
    } catch (_) {
      console.log(_);
      this.content = {
        DISABLE_AUTOSTART: false,
      }
    }
  }
}
