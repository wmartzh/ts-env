
export type ConfigType  = 'JSON' | 'YAML' | 'TOML';

export interface Config {
  path?: string;
  encoding?: BufferEncoding;
  type?: ConfigType;
 
}

export type ParserFunction = (path: string, econding:BufferEncoding ) => Record<string, string> | undefined;