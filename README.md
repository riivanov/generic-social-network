## Install tools

This assumes you have NPM and Node installed.

- If not download [NVM](https://github.com/nvm-sh/nvm).

As a conveniece the Linux commands for installing NVM/Node are provided. If you're using another OS please see the link above.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
node --version # 20.11.0
npm --version # 10.2.4
```

- Install pnpm

```
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=10.0.0 sh -
source ~/.bashrc
```

- Install jest

```
pnpm i -g jest
```

- Install postgres
```
sudo pacman -S postgresql
```

- Configure postgres
```
sudo -u postgres initdb -D /var/lib/postgres/data
# Input password test
sudo -u postgres createuser -P -s test
sudo -u postgres createdb gsn
```

## Clone the repo

```  
# Clones to current directory `pwd`
git clone https://github.com/riivanov/generic-social-network.git
cd ./generic-social-network
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
