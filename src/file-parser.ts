import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as toml from 'toml';
import * as p from 'path';
import { ConfigType } from './types';

/* The `FileParser` class is a TypeScript class that can parse YAML, JSON, and TOML files and return
their contents as objects. */
export class FileParser {
  constructor(
    private readonly path: string,
    private readonly encoding: BufferEncoding = 'utf8'
  ) {}

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

  /**
   * The function writes TypeScript type definitions for environment variables to a file.
   * @param {string[]} keys - The `keys` parameter is an array of strings. It represents the keys that
   * will be used to define the types in the generated TypeScript file.
   */
  private writeTypes(keys: string[]) {
    const file = `
    export type ENV = Record<${keys.map((k) => `"${k}"`).join(' | ')}, string>;
    declare global {
      namespace NodeJS {
        interface ProcessEnv extends ENV {}
      }
    }
    `;
    fs.writeFileSync(p.join(process.cwd(), '/dist/types.d.ts'), file, {
      flag: 'a',
    });
  }

  /* The `public parse(type: ConfigType): Record<string, string>` method is a public method of the
  `FileParser` class. It takes a `type` parameter of type `ConfigType`, which is an enum
  representing the type of file to parse (e.g., YAML, JSON, TOML). */
  public parse(type: ConfigType): Record<string, string> {
    console.log('◉ ▶ FileParser ▶ parse ▶ type:', this.path);
    const file = this[`parse${type}`]();
    const keys = Object.keys(file);
    if (keys.length) {
      this.writeTypes(keys);
    }

    return file;
  }
}
