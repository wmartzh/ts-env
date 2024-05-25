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
 * TODO: Validate that files are valid YAML, JSON, or TOML files.
 * The `main` function takes a `config` object as input, sets default values for `path`, `encoding`,
 * and `type`, and then attempts to parse a file based on the specified `type` and `path`, and sets the
 * values of the parsed file.
 * @param {Config} config - The `config` parameter is an object that contains the configuration options
 * for the main function. It has the following properties:
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
