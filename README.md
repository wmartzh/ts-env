# ts-env
A typescript enviroment file management tool


## Motivation 
The availability of node can run on different enviroments allow us to use the same codebase for different platforms. However, the different enviroments may have different config files formats. There are some tools like dotenv, dotenv-yaml, to help us load the config files. However, they are not flexible enough to support different config files formats.

## Install

```bash
#NPM
npm install @wmartzh/ts-env

#Yarn
yarn add @wmartzh/ts-env

```


## Usage
Can be used as a module or pre-load script

### Pre-load script

### Module
you can use ts-env as a module to load the config files. The config files will be loaded when you import the module.
```typescript
import { tsEnv } from '@wmartzh/ts-env';

tsEnv() // load the config files
```

### Import Env type
ts-env also provide a type for the config files. You can import it by
  
  ```typescript
  import { ENV } from '@wmartzh/ts-env';
  ```