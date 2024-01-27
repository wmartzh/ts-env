export * from './tsEnv';
export * from './types';
import { init } from './cli';

if (require.main === module) {
  init();
}
