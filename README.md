# UNPKG (fork)

**The goals of this fork are:**

* Make it easier to self-host Unpkg.
* Keep it upstream compatible.
* Keep dependencies up to date.
* Make no functional changes or add new features.
------

[UNPKG](https://unpkg.com) is a fast, global [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) for everything on [npm](https://www.npmjs.com/).

## Development

prepare:

```bash
git clone https://github.com/renxia/unpkg.git
cd unpkg
pnpm i
cp .env.sample .env.local # and edit the env.local config for local development
```

dev:

```bash
pnpm watch
pnpm serve
```

## Build and deploy

```bash
cp .env.sample .env.prod # and edit the env.prod config for production
set NODE_ENV=production # or staging
pnpm build
pnpm pack
```

A file will be generated like `unpkg-<version>.tgz`.
Deploy it in your server with pm2:

```bash
tar zxvf unpkg-<version>.tgz
cd package
npm i --omit dev
# pnpm i -P
pm2 -n unpkg start.js
```

## Configuration with `.env[.prod|.local]`

Learn more from the file [.env.sample](./.env.sample).

```yaml
# config for private registry url
NPM_REGISTRY_URL=https://registry.npmjs.org

# your unpkg website url
ORIGIN=https://npmcdn.lzw.me
# port to listen on. default 8080
PORT=8080

# enableDebugging
# DEBUG=1

# Google Analytics MEASUREMENT_ID. your can set empty to disable it.
GTAG_MEASUREMENT_ID=UA-140352188-1

# ENABLE_CLOUDFLARE=1
# CLOUDFLARE_EMAIL=test@lzw.me
# CLOUDFLARE_KEY=test
```

## Documentation

Please visit [the UNPKG website](https://unpkg.com) to learn more about how to use it.

## Sponsors

Our sponsors and backers are listed [in SPONSORS.md](SPONSORS.md).
