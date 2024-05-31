import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as toml from 'toml';
import { ConfigType } from './types';

/* The `FileParser` class is a TypeScript class that can parse YAML, JSON, and TOML files and return
their contents as objects. */
export class FileParser {
  constructor(
    private readonly path: string,
    private readonly encoding: BufferEncoding = 'utf8'
  ) {}

  /**
   * The function `parseENV` reads and parses an environment file to create a key-value object of
   * environment variables.
   * @returns The `parseENV` method is returning an object of type `Record<string, string>`, which is
   * essentially an object with string keys and string values. This object contains key-value pairs
   * parsed from an environment file read by the method.
   */
  private parseENV(): Record<string, string> {
    const file = fs.readFileSync(this.path, this.encoding);

    const lines = file.split('\n');
    const env: { [key: string]: string } = {};
    for (const line of lines) {
      const lineWithoutComments = line.trim().split('#')[0];
      const [key, value] = lineWithoutComments.replace(/"/g, '').split('=');
      if (key && value) {
        env[key] = value.trim();
      }
    }

    return env;
  }
  /**
     * The function `parseYaml` reads a YAML file from the specified path and returns its contents as an.
     * @param {string} path - The `path` parameter is a string that represents the file path of the YAML
     * @param {BufferEncoding} [encoding=utf8] - The encoding parameter specifies the character encoding to
    
     * @returns the parsed YAML file as an object. If the file cannot be parsed, an empty object is
     * returned.
     */
  private parseYAML(): Record<string, string> {
    const file: any = yaml.load(fs.readFileSync(this.path, this.encoding));
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
  private parseJSON(): Record<string, string> {
    const file: any = JSON.parse(fs.readFileSync(this.path, this.encoding));
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
  private parseTOML(): Record<string, string> {
    const file: any = toml.parse(fs.readFileSync(this.path, this.encoding));
    return file ?? {};
  }

  /* The `public parse(type: ConfigType): Record<string, string>` method is a public method of the
  `FileParser` class. It takes a `type` parameter of type `ConfigType`, which is an enum
  representing the type of file to parse (e.g., YAML, JSON, TOML). */
  public parse(type: ConfigType): Record<string, string> {
    if (!fs.existsSync(this.path) ) {
      console.log('File does not exist');
      return {};
    }
    const file = this[`parse${type}`]();
    return file;

  }
}
