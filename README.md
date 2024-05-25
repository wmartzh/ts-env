# ts-env
[logo](https://github.com/wmartzh/ts-env/docs/images/ts-env.png)

[![npm version](https://badge.fury.io/js/%40wmartzh%2Fts-env.svg)](https://badge.fury.io/js/%40wmartzh%2Fts-env)


A typescript enviroment file management tool


# Motivation 
The availability of node can run on different enviroments allow us to use the same codebase for different platforms. However, the different enviroments may have different config files formats. There are some tools like dotenv, dotenv-yaml, to help us load the config files. However, they are not flexible enough to support different config files formats.

# Installation

```bash
#NPM
npm install @wmartzh/ts-env

#Yarn
yarn add @wmartzh/ts-env

```

# Usage

You can use ts-env as a module to load the config files. The config files will be loaded when you import the module.
```typescript
import { tsEnv } from '@wmartzh/ts-env';

tsEnv({}) // load the config files
```

## Config Interface

The `Config` interface defines the structure for configuration options used in our application. Below are the details of each property within this interface.

### Properties

#### `path` (optional)

- **Type:** `string`
- **Description:** Specifies the file path for the configuration. If not provided, the default path will be used.

#### `encoding` (optional)

- **Type:** `BufferEncoding`
- **Description:** Defines the character encoding to be used. This must be a valid `BufferEncoding` type (e.g., `'utf8'`, `'ascii'`, `'base64'`, etc.). If not specified, the default encoding is `'utf8'`.

### `type` (optional)

- **Type:** `ConfigType`
- **Description:** Specifies the type of configuration. This is an enumerated value (`ConfigType`) that should be defined elsewhere in the codebase. It indicates the specific configuration format or category being used.

#### `writeTypes` (optional)

- **Type:** `boolean`
- **Description:** A flag indicating whether to write type definitions. If set to `true`, type definitions will be included in the output. The default value is `false`.
- **Default:** `YAML`   valid values are `JSON`, `YAML`, `ENV`

## Example

Here is an example of how the `Config` interface can be used:

```typescript
const config: Config = {
  path: './config.json',
  encoding: 'utf8',
  type: ConfigType.JSON,
  writeTypes: true
};
```



## Roadmap

- [x] Support .env file
- [x] Support .env.yaml file
- [x] Support .env.json file
- [x] Export types 
- [ ] Support multi environment 
- [ ] Check valid format files
- [ ] Support pre-load script