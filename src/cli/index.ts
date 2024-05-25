// bin/ts-env

import { tsEnv } from '../tsEnv';
import { Config } from '../types';
import { Command } from 'commander';

export function init(): void {
  const program = new Command();

  program
    .name('ts-env')
    .description('A typescript enviroment file management tool')
    .option(
      '-p, --path <string>',
      'Path to the file to load environment variables from.',
      './.env.yml'
    )
    .option(
      '-e, --encoding <string>',
      'Encoding of the file to load environment variables from.',
      'utf8'
    )
    .option(
      '-t, --type <string>',
      'Type of the file to load environment variables from. Valid options are JSON, YAML, and TOML.',
      'YAML'
    )
    .option(
      '-w, --write-types <boolean>',
      'Write TypeScript types for the environment variables.'
    );

  program.parse(process.argv);

  const opts = program.opts();

  const config: Config = {
    path: opts.path ?? undefined,
    encoding: opts.encoding ?? undefined,
    type: opts.type ?? undefined,
    writeTypes: opts.writeTypes ?? undefined,
  };

  tsEnv(config);
}


