# UNPKG (fork)

English | [简体中文](./README.md)

[UNPKG](https://unpkg.com) is a fast, global [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) for everything on [npm](https://www.npmjs.com/).

**The goals of this fork are:**

* Make it easier to self-host Unpkg.
* Keep it upstream compatible.
* Keep dependencies up to date.
* Make no functional changes or add new features.
* Added `Dockerfile` image configuration
* Added `docker-compose.yaml` configuration (not tested yet).
* Configure docker`run-ucdn.sh` startup script
------

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

### Docker deploy
> If you use docker for deployment, you can ignore the above build and deployment and use docker to deploy directly (more recommended)

**docker image make**
```bash
docker build . -t ebear/unpkg
```
**docker image release**
```bash
# Internal private docker registry
docker tag ebear/unpkg ${Private docker warehouse directory}/unpkg:latest
docker push ${Private docker warehouse directory}/unpkg:latest
```
**docker image use**
```bash
# pull image
docker pull ${Private docker warehouse directory}/unpkg:latest
```

```bash
# start up unpkg
source run-ucdn.sh
```
**docker startup configuration**
For startup, you can directly modify `run-ucdn.sh` for quick docker startup or write your own startup script.

Method 1：
```bash
# Directly update and use the configured script to modify the startup unpkg method
vim  run-ucdn.sh
#  -p 3888:8080 \
# -e NODE_ENV=production \
# -e NPM_REGISTRY_URL=https://registry.npmjs.org \
# -e ORIGIN=http://127.0.0.1:4873 \
# ${Private docker warehouse directory}/unpkg:latest
source run-ucdn.sh
```
Method 2：
```bash
docker run -d -it --name ucdn --restart=always \
  -p 3888:8080 \
  -e NODE_ENV=production \
  -e NPM_REGISTRY_URL=https://registry.npmjs.org \
  -e ORIGIN=http://127.0.0.1:4873 \
  harbor.***.com/base_image/unpkg:latest
```
* Default port: container `8080`, host `3888` (adjust according to your actual situation)
* Default public network NPM address: `NPM_REGISTRY_URL=https://registry.npmjs.org`
* Default private NPM address: `ORIGIN=http://http://127.0.0.1:4873` (adjust according to your actual private library)

## grateful
This solution is not original. I would like to thank [renxia](https://github.com/renxia) for its support in modifying and upgrading dependencies. I only made adjustments to the docker deployment part, added new additions, and locked some dependencies; source warehouse [unpkg](https://github.com/renxia/unpkg)
