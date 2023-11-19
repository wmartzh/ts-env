export * from "./tsEnv";
export * from "./types";

import cli from "./cli";

if(require.main === module){
  cli();
}
