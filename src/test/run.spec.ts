import { tsEnv } from '../index';

describe('Main Function', () => {
  it('Should load the environment variables from env file', () => {
    tsEnv({ path: './src/test/', prefix: 'test', type: 'ENV' });
    expect(process.env.person).toBeDefined();
  });
  it('Should load the environment variables from yaml file', () => {
    tsEnv({ path: './src/test/', prefix: 'test', type: 'YAML' });
    expect(process.env.person).toBeDefined();
  });

  it('Should load the environment variables from json file', () => {
    tsEnv({
      path: './src/test',
      prefix: 'test',
      type: 'JSON',
    });
    expect(process.env.string).toBeDefined();
    expect(process.env.string).toBe('Hello, World!');
  });

  it('Should load the environment variables from toml file', () => {
    tsEnv({ path: './src/test', prefix: 'test', type: 'TOML' });
    expect(process.env.string).toBeDefined();
    expect(process.env.string).toBe('Hello, World!');
  });
});
