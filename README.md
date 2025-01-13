## Install tools

This assumes you have NPM and Node installed.

- If not download [NVM](https://github.com/nvm-sh/nvm).

As a conveniece the Linux commands for installing NVM/Node are provided. If you're using another OS please see the link above.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
nvm use --lts
node --version # 20.11.0
npm --version # 10.2.4
```

- Install pnpm

```
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=10.0.0 sh -
```

## To run the server

- Install dependencies in node_modules and run the server the verbose way.

```
pnpm i
npx nx dev server
```

- Optionally install `nx` globally and run the shortcut to the server.

```
pnpm i nx -g
nx
```
