import { parseJSON, parseToml, parseYaml } from "./parsers";
import { Config, ConfigType, ParserFunction } from "./types";
import * as p from "path";
const DEFAULT_PATH = "./env.yml";
const DEFAULT_ENCODING: BufferEncoding = "utf8";
const DEFAULT_TYPE: ConfigType = "YAML";

const parsers: { [k: string]: ParserFunction } = {
  YAML: parseYaml,
  JSON: parseJSON,
  TOML: parseToml,
};

function setValues(fileData: any) {
  Object.keys(fileData).forEach(function (key) {
    process.env[key] = process.env[key] ?? fileData[key];
  });
}

/**
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
    const file = parsers[type](parsedPath, encoding);
    setValues(file);
  } catch (error) {
    console.error(error);
  }
}
