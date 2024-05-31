import * as p from 'path';
import * as fs from 'fs';

const DEFAULT_TYPE_PATH = './lib/cjs/types/env.d.ts';

/**
 * The function writes TypeScript type definitions for environment variables to a file.
 * @param {string[]} keys - The `keys` parameter is an array of strings. It represents the keys that
 * will be used to define the types in the generated TypeScript file.
 */
export function writeTypes(keys: string[]): void {
  const path = p.join(process.cwd(), DEFAULT_TYPE_PATH);
  const types = keys.map((k) => `"${k}"`).join(' | ');

  const file = `
export type ENV = Record< ${types}, string>;
declare global {
  namespace NodeJS {
    interface ProcessEnv extends ENV {}
  }
}
    `;

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  fs.writeFileSync(path, file, {
    flag: 'a+',
  });
}
