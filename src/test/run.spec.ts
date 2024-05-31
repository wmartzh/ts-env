import { tsEnv } from '../index';
import { writeTypes } from '../utils/typing.utils';

describe('Main Function', () => {
  it('Should load the environment variables from env file', () => {
    tsEnv({
      path: '/src/test',
      prefix: 'test',
      type: 'ENV',
      disableTypes: true,
    });
    expect(process.env.DB_HOST).toBeDefined();
  });
  it('Should load the environment variables from yaml file', () => {
    tsEnv({
      path: '/src/test',
      prefix: 'test',
      type: 'YAML',
      disableTypes: true,
    });
    expect(process.env.person).toBeDefined();
  });

  it('Should load the environment variables from json file', () => {
    tsEnv({
      path: '/src/test',
      prefix: 'test',
      type: 'JSON',
      disableTypes: true,
    });
    expect(process.env.string).toBeDefined();
    expect(process.env.string).toBe('Hello, World!');
  });

  it('Should load the environment variables from toml file', () => {
    tsEnv({
      path: '/src/test',
      prefix: 'test',
      type: 'TOML',
      disableTypes: true,
    });
    expect(process.env.string).toBeDefined();
    expect(process.env.string).toBe('Hello, World!');
  });
});
