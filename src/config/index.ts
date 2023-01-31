import { ConfigVariable } from "./config-variable";

class ConfigService {
  getValue(key: ConfigVariable) {
    console.log(process.env);
    return process.env[key];
  }
}

export const configService = new ConfigService();
export * from "./config-variable";
export * from "./routes";
