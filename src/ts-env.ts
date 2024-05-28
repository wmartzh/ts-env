import { FileParser } from './file-parser';
import { Config, ConfigType, EnvTypes } from './types';
import * as fs from 'fs';
import * as p from 'path';
import { writeTypes } from './utils/typing.utils';

const DEFAULT_PATH = './';
const DEFAULT_PREFIX = '.env';
const DEFAULT_ENCODING: BufferEncoding = 'utf8';
const DEFAULT_TYPE: ConfigType = 'ENV';


function setValues(fileData: any) {
  Object.keys(fileData).forEach(function (key) {
    process.env[key] = process.env[key] ?? fileData[key];
  });
}

function pathParser(
  path: string,
  type: ConfigType,
  environment: EnvTypes,
  noMulti?: boolean,
  prefix?: string
): string {
  const pref = prefix ?? DEFAULT_PREFIX;
  if (noMulti) {
    return `${path}/${pref}.${type.toLowerCase()}`;
  }

  if (type === 'ENV') {
    return `${path}/.${type.toLowerCase()}.${environment}`;
  }

  return `${path}/${pref}.${environment}.${type.toLowerCase()}`;
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
    environment = 'local',
    path = DEFAULT_PATH,
    encoding = DEFAULT_ENCODING,
    type = DEFAULT_TYPE,
    noMulti,
  } = config ?? {};

  try {
    const filePath = pathParser(path, type, environment, noMulti, prefix);
    const parsedPath = p.join(process.cwd(), filePath);
    const parser = new FileParser(parsedPath, encoding);

    const file = parser.parse(type);

    setValues(file);

    if (config?.writeTypes) {
      writeTypes(Object.keys(file));
    }
  } catch (error) {
    console.error(error);
  }
}
