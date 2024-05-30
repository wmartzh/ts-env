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

function getPossibleFiles() {
  try {
    const envFileRegExp = /^(?:\.env|\.env\..+)$/i;
    const otherFilesRegExp = new RegExp(/.yaml|yml|toml|json$/i);

    const output = childProcess.execSync('ls -a', { encoding: 'utf8' });

    const files = output
      .split('\n')
      .filter(
        (file) => otherFilesRegExp.test(file) || envFileRegExp.test(file)
      );

    if (files.length === 0) {
      return DEFAULT_FILES;
    }
    return files;
  } catch (error) {
    return DEFAULT_FILES;
  }
}

function pathParser(
  path: string,
  type: ConfigType,
  environment?: EnvTypes,
  prefix?: string
): string {
  const pref = prefix ?? DEFAULT_PREFIX;
  const possibleFiles = getPossibleFiles();

  const selected = possibleFiles.find((file) =>
    environment
      ? file.includes(pref) &&
        file.includes(type.toLowerCase()) &&
        file.includes(environment)
      : file.includes(pref) && file.includes(type.toLowerCase())
  );


  return (
    `${path}${selected}` ??
    `${path}${pref}.${environment}.${type.toLowerCase()}`
  );
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

    if (config?.writeTypes) {
      writeTypes(Object.keys(file));
    }
  } catch (error) {
    console.error(error);
  }
}
