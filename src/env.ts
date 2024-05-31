export type ENV = Record<string, string>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ENV {}
  }
}
