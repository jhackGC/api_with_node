# This is a NODE JS API project

# Tooling

You need NodeJS (version >20) and NPM installed (version >10)
You can use NVM to manage your Nodee versions https://github.com/nvm-sh/nvm

# Plain implementation

see src/basic_server.js

## Psql

We'll be using (PostgresSQL) PSQL as a DB.
You can install it locally or you can use a hosting and managed DB like Render.

https://render.com/

If using Render, create an account, and then create a FREE psql cloud DB.
Your FREE DB instace will be available and free for 30 days, then deleted if not upgraded.

# Install Prisma and Typescript

```bash
npm i typescript ts-node @types/node prisma --save-dev
```

install "typescript" which is the transpiler that's ging to convert Typescript into Javascript.
and install "ts-node" is to run node in the terminal, pointing at a file, but doing it in a typescript environment
and @types/node are the types for the node runtime

With TS, we can use autocomplete for our DB interactions through Prisma.

Then create a tsconfig.json file which is the config file for TypeScript. Add this to that file:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

Next, we'll initalize Prisma

```bash
npx prisma init
```

`npx` lets you run commands from libraries as if they were installed globally, directly from the terminal. If you don’t use `npx` and the library is only installed locally, you would need to run it using its path in `node_modules`, like this:

```
./node_modules/.bin/prisma
```

This command will do a few things:

- Create a prisma folder
- Create a schema file in that folder

### Prisma models

We'll need at least the following

- `Update` - title, body, asset, status (in progress, launched), created at, and version
- `Update Point` - belongs to an update, type (feature, improvement, bug)
- `Feature`
- `Users`

There will probably be supporting models that we create to help with querying and other logic like authenticatio
