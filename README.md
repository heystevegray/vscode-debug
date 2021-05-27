# Next.js TypeScript Material UI quality checking project

Includes TypeScript, Material UI, ESLint, Jest, and React Testing Library

-   [Deploy your own](#deploy-your-own)
-   [How to use](#how-to-use)
-   [Scripts](#scripts)
    -   [build](#build)
    -   [dev](#dev)
    -   [format](#format)
    -   [lint](#lint)
    -   [start](#start)
    -   [test](#test)
    -   [type-check](#type-check)
    -   [quality](#quality)
-   [Accessibility ](#accessibility)

## Deploy your own

## App startup

Choose how to start your development server based on your database configuration below.

### SQLite

Start up your development server with the following command:

```
npm run dev
```

### Postgres

Start up your development server with the following command:

```
docker-compose up
```

Once your development server is up and running, in a new terminal run the following command:

```
 npm run prisma
```

`npm run prisma` will do a few things for us:

-   Format your `prisma/schema.prisma` file (`prisma format`) | [prisma format documentation](https://www.prisma.io/docs/reference/api-reference/command-reference#format)
-   Keeps your `prisma/schema.prisma` file in sync with your database by auto generating migrations when needed (`npm run migrate`) | [prisma migration documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)
-   Seed your database with (`npm run seed`) | [prisma seeding documentation](https://www.prisma.io/docs/guides/database/seed-database/)

## Using Prisma

> Prisma helps app developers build faster and make fewer errors with an open source ORM for PostgreSQL, MySQL and SQLite. | [Source](https://www.prisma.io/)

### Adding a table to your database

Adding a table is as easy as adding a model to your `schema.prisma` file, followed by [creating a migration](#Creating-migrations). For a tutorial on this visit the [prisma schema documentation](https://www.prisma.io/docs/concepts/components/prisma-schema).

### Creating migrations

Once you've made the [appropriate changes to your `schema.prisma`](#Adding-a-table-to-your-database) file you can auto generate a migration using

```bash
npm run migrate
```

This will generate a new folder under `prisma/migrations` with a SQL file outlining the changes to be reflected to your database and also generate new TypeScript code for prisma client usage.

## Scripts

All scripts can be run by prefixing with `npm run`, for example `npm run build`

### build

Builds the production application in the .next folder.

```bash
npm run build
```

### dev

Starts the application in development mode with hot-code reloading, error reporting, and more:

The application will start at http://localhost:3000 by default. The default port can be changed with -p, like so:

```bash
npm run dev -p 4000
```

### format

Runs ESLint and Prettier auto-formatting.

```bash
npm run format
```

### lint

Runs ESLint static code analysis based on your `.eslintrc` configuration

```bash
npm run lint
```

### start

Starts the application in production mode. The application should be compiled with `npm run build` first.

The application will start at http://localhost:3000 by default. The default port can be changed with -p, like so:

```bash
npm run start -p 4000
```

### test

Runs Jest unit tests to validate changes between commits

```bash
npm run test
```

### type-check

Runs TypeScript compiler to validate there are no type errors between commits

```bash
npm run type-check
```

### quality

Runs `type-check`, `lint`, and `test` to make an better developer experience catching preventable quality errors.

```bash
npm run quality
```

## Accessibility

### @axe-core/react

Runs in development environment and logs accessibility error results in dev tools console. Tool implementation is in `pages/_app.tsx`.
