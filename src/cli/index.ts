import { tsEnv } from "../tsEnv";
import { Config } from "../types";

const validOpts = ["path", "encoding", "type", "p", "e", "t"];

const help = `
  Usage: ts-env [options]

  Options:
    --path, -p      Path to the file to load environment variables from.
    --encoding, -e  Encoding of the file to load environment variables from.
    --type, -t      Type of the file to load environment variables from. Valid options are JSON, YAML, and TOML.
    --help, -h      Show help.
`;

function parseArgs(args: string[]): any {
  const options: any = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("--")) {
      // Long option (e.g., --path=./)
      const [name, value] = arg.slice(2).split("=");
      options[name] = value || args[i + 1];
    } else if (arg.startsWith("-")) {
      // Short option (e.g., -p ./)
      const name = arg.slice(1);
      options[name] = args[i + 1];
    }
  }

  return options;
}

export default function init(): void {
  const config: Config = {};
  const args = parseArgs(process.argv);

  for (const arg in args) {
    if (arg === "help" || arg === "h") {
      console.log(help);
      process.exit(0);
    }

    if (!validOpts.includes(arg)) {
      console.error(`Invalid option: ${arg}`);
      console.log(help);
      process.exit(1);
    }
    config.encoding = args.encoding ?? args.e ?? undefined;
    config.path = args.path ?? args.p ?? undefined;
    config.type = args.type ?? args.t ?? undefined;
  }
  tsEnv(config);

}
