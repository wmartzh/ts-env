import { FileParser } from './file-parser';
import { Config, ConfigType, EnvTypes } from './types';
import * as p from 'path';
import * as childProcess from 'child_process';
import { writeTypes } from './utils/typing.utils';

const DEFAULT_PATH = './';
const DEFAULT_PREFIX = '.env';
const DEFAULT_ENCODING: BufferEncoding = 'utf8';
const DEFAULT_TYPE: ConfigType = 'ENV';
const DEFAULT_FILES = ['.env', 'env.yaml', 'env.yml', 'env.toml', 'env.json'];

function setValues(fileData: any) {
  Object.keys(fileData).forEach(function (key) {
    process.env[key] = process.env[key] ?? fileData[key];
  });
}

function pathParser(
  path: string,
  type: ConfigType,
  environment?: EnvTypes,
  prefix?: string
): string {
  const pref = prefix ?? DEFAULT_PREFIX;

  return environment
    ? `${path}/${pref}.${environment}.${type.toLowerCase()}`
    : `${path}/${pref}.${type.toLowerCase()}`;
}

function findFile(
  files: string[],
  pref: string,
  type: ConfigType,
  environment?: EnvTypes
): string | undefined {
  return files.find((file) => {
    return true;
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
    prefix = DEFAULT_PREFIX,
    environment,
    path = DEFAULT_PATH,
    encoding = DEFAULT_ENCODING,
    type = DEFAULT_TYPE,
  } = config ?? {};

  try {
    const filePath = pathParser(path, type, environment, prefix);

    const parsedPath = p.join(process.cwd(), filePath);

    const parser = new FileParser(parsedPath, encoding);

    const file = parser.parse(type);

    setValues(file);

    if (!config?.disableTypes) {
      writeTypes(Object.keys(file));
    }
  } catch (error) {
    console.error(error);
  }
}
