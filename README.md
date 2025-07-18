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
and install "ts-node" is to run node in the terminal, pointing at a file, but doing it in a typescript environment, it transpiles TS to JS on the fly to be able to be run by the Node runtime
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

If using VS Code you can add the Prisma extension
https://marketplace.visualstudio.com/items?itemName=Prisma.prisma

### Prisma models

We will use a mocked front end for this project, https://chronos.framer.website/

From the website design, we figure out which models we need, so, we may need some models like:

In the UI we can see:

- Roadmap, projects, tasks , users, features

- `Update` - title, body, asset, status (in progress, launched), created at, and version
- `Update Point` - belongs to an update, type (feature, improvement, bug)
- `Feature`
- `Users`

There will probably be supporting models that we create to help with querying and other logic like authenticatio

### Prisma Syntax and models definition

Prisma has an easy to understand syntax for creating models. Its based on the GraphQL language which is based on JSON. So you'll feel right at home.
I highly recommend installing the Prisma VS Code plugin. It lints and cleans up your schema file.

Example model

```prisma
model Post {
    // id field that is a number and automatically increments after its used
    id Int @id @default(autoincrement())
    // timestamps
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    // limit to 255 for indexing UTF-8
    title String @db.VarChar(255)
    // optional
    content String?
    published Boolean @default(false)
    // relation to another model
    author User @relation(fields: [authorId], references: [id])
    authorId Int
}
```

Most of this is self explanatory, but check out the comments in the code to learn a bit more context.

The rest of the modeling looks very much like this.

User

```prisma
model User {
    id String @id @default(uuid())
    createdAt DateTime @default(now())
    username String @unique
    password String
    updates ProductUpdate[]
}
```

Product

```prisma
model Product {
    id String @id @default(uuid())
    createdAt DateTime @default(now())
    name String
    belongsTo User @relation(fields: [belongsToId], references: [id])
    belongsToId String
    updates ProductUpdate[]
}
```

For the change log app, the user might have many products they want to update.
So we need a place to store multiple updates.

So products belong to a User.

ProductUpdate

```prisma
enum PRODUCT_UPDATE_STATUS {
    IN_PROGRESS
    LIVE
    DEPRECATED
    ARCHIVED
}

model ProductUpdate {
    id String @id @default(uuid())
    createdAt DateTime @default(now())
    updatedAt DateTime

    title String @db.VarChar(255)
    body String
    status UPDATE_STATUS @default(IN_PROGRESS)
    version String?
    asset String

    productId String
    product Product @relation(fields: [productId], references: [id])
    updatePoints UpdatePoint[]
}
```

Products can have updates. So products belong to updates.

ProductUpdates have many fields, one is called status.
Because status is a finite set of options, we created an ENUM to represent our status.

Think of an enum value types as "one-of-these". So the value must be one of the values in the ENUM instead of being any other random string.

And finally, update points are the bullets points on an update. They belong to an update, which belongs to a product, which belongs to a user.

Update Points

```prisma
model UpdatePoint {
    id String @id @default(uuid())
    createdAt DateTime @default(now())
    updatedAt DateTime

    name String @db.VarChar(255)
    description String

    updateId String
    update ProductUpdate @relation(fields: [updateId], references: [id])
}
```

As we continue to build, we will most likely make changes to our schema to fit the experience we want to create.

After your edits in the prisma file you can run

```bash
npx prisma format
```

to format it

### Initial load to the DB

#### Migrations

Since this is our first time interacting with the DB, we need to run our initial migration to get the DB and our schema in sync.

Only SQL DBs use migrations as a way to track and apply changes to the database schema over time. Migrations allow you to version your schema, update tables, add or remove columns, and keep your database structure in sync with your application code. Non-SQL databases (like NoSQL) typically do not use migrations in the same way, since their schemas are more flexible or schema-less.

We'll continue to run migrations as we make schema changes to ensure the schema and any data in the DB stay in sync.

Before we run a migration, we need to install the prisma client which is the SDK we'll use in our code to interact with the DB.

This client is type-safe and based on of our schema. It's actually an NPM package that gets generated on demand to adjust to your schema! Pretty cool.

```bash
npm i @prisma/client --save
```

Next, lets migrate the DB. Make sure you added your DB connection string to the .env file as DATABASE_URL.

You can find the connection string on Render. Be sure to use the external one.

Now to run the migration:

```bash
npx prisma migrate dev --name init
```

This will migrate the DB over to use our schema and then generate the new client for us.

This client will be used in our code and is now type-checked against our schema.
Awesome
