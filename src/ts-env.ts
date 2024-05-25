import { FileParser } from "./file-parser";
import { Config, ConfigType, ParserFunction } from "./types";
import * as p from "path";

const DEFAULT_PATH = "./.env.yml";
const DEFAULT_ENCODING: BufferEncoding = "utf8";
const DEFAULT_TYPE: ConfigType = "YAML";

function setValues(fileData: any) {
  Object.keys(fileData).forEach(function (key) {
    process.env[key] = process.env[key] ?? fileData[key];
  });
}


/**
 * The `tsEnv` function in TypeScript parses a file based on the provided configuration and sets values
 * accordingly, with an option to write types if specified.
 * @param {Config} [config] - The `config` parameter is an optional object that can contain the
 * following properties:
 */
export function tsEnv(config?: Config): void {
  const {
    path = DEFAULT_PATH,
    encoding = DEFAULT_ENCODING,
    type = DEFAULT_TYPE,
  } = config ?? {};

  try {
    const parsedPath = p.join(process.cwd(), path);
    const parser = new FileParser(parsedPath, encoding);
    const file = parser.parse(type);
    setValues(file);
    
    if (config?.writeTypes) {
      parser.writeTypes(Object.keys(file));
    }
    
  } catch (error) {
    console.error(error);
  }
}
