export type ConfigType = 'JSON' | 'YAML' | 'TOML' | 'ENV';

export type EnvTypes = 'development' | 'local' | 'production';

export interface Config {
  prefix?: string;
  path?: string;
  encoding?: BufferEncoding;
  type?: ConfigType;
  disableTypes?: boolean;
  environment?: EnvTypes;
}

export type ParserFunction = (
  path: string,
  econding: BufferEncoding
) => Record<string, string> | undefined;
