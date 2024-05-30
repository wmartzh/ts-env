import { tsEnv } from '../ts-env';
import { Config } from '../types';
import { Command } from 'commander';

export function init(): void {
  const program = new Command();

  program
    .name('ts-env')
    .description('A typescript enviroment file management tool')
    .option(
      '--prefix <string>',
      'Prefix for the environment file to load environment variables from.',
      '.env'
    )
    .option(
      '-env, --environment <string>',
      'Environment to load environment variables from.',
      'local'
    )
    .option(
      '-p, --path <string>',
      'Path to the file to load environment variables from.',
      './'
    )
    .option(
      '-e, --encoding <string>',
      'Encoding of the file to load environment variables from.',
      'utf8'
    )
    .option(
      '-t, --type <string>',
      'Type of the file to load environment variables from. Valid options are JSON, YAML, and TOML.',
      'ENV'
    )
    .option(
      '-w, --write-types',
      'Write TypeScript types for the environment variables.'
    )

  program.parse(process.argv);

  const opts = program.opts();


  const config: Config = {
    prefix: opts.prefix ?? '.env',
    path: opts.path ?? undefined,
    environment: opts.environment ?? undefined,
    encoding: opts.encoding ?? undefined,
    type: opts.type ?? undefined,
    writeTypes: opts.writeTypes ?? undefined,
  };
  tsEnv({
    type: 'JSON',
    writeTypes: true,
  });

}
