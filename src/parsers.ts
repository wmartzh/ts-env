import * as yaml from "js-yaml";
import * as fs from "fs";
import * as toml from "toml";

/**
 * The function `parseYaml` reads a YAML file from the specified path and returns its contents as an.
 * @param {string} path - The `path` parameter is a string that represents the file path of the YAML
 * @param {BufferEncoding} [encoding=utf8] - The encoding parameter specifies the character encoding to

 * @returns the parsed YAML file as an object. If the file cannot be parsed, an empty object is
 * returned.
 */
export function parseYaml(
  path: string,
  encoding: BufferEncoding,
): Record<string, string> {
  const file: any = yaml.load(fs.readFileSync(path, encoding));
  return file ?? {};
}

/**
 * The function `parseJSON` reads a JSON file from the given path and returns its contents as an
 * object, or an empty object if the file is empty or cannot be parsed.
 * @param {string} path - The `path` parameter is a string that represents the path to the JSON file
 * that you want to parse. It should include the file name and extension.
 * @param {BufferEncoding} [encoding=utf8] - The encoding parameter specifies the character encoding to
 * be used when reading the file. It is optional and defaults to 'utf8' if not provided.
 * @returns the parsed JSON object from the file at the specified path. If the file cannot be read or
 * parsed, an empty object is returned.
 */
export function parseJSON(
  path: string,
  encoding: BufferEncoding = "utf8",
): Record<string, string> {
  const file: any = JSON.parse(fs.readFileSync(path, encoding));
  return file ?? {};
}

/**
 * The function `parseToml` reads a TOML file from the given path and returns its contents as a
 * TypeScript object.
 * @param {string} path - The `path` parameter is a string that represents the path to the TOML file
 * that you want to parse. It should include the file name and extension.
 * @param {BufferEncoding} [encoding=utf8] - The `encoding` parameter specifies the character encoding
 * to be used when reading the file. It is optional and defaults to `'utf8'`, which is the most common
 * encoding for text files.
 * @returns The function `parseToml` returns a `Record<string, string>`.
 */
export function parseToml(
  path: string,
  encoding: BufferEncoding = "utf8",
): Record<string, string> {
  const file: any = toml.parse(fs.readFileSync(path, encoding));
  return file ?? {};
}
