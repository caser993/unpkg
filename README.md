# UNPKG (fork)

> *！！！已修改兼容内网npm私有和镜像化，原仓库描述仅供参考，其中.env配置已不适用生产需要。case.lih 2023-10-21 14:22:40*

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
> 上述步骤已镜像化封包，除非必要无需调整，可忽略

## Release Update

* 新增`Dockerfile`镜像配置
* 新增`docker-compose.yaml`配置(未实测)
* 新增`run-ucdn.sh`启动脚本

**docker image制作**
```bash
docker build . -t cc993/unpkg
```
**docker image发布**
```bash
# 内部私有docker registry
docker tag cc993/unpkg harbor.yn.bjgykj.cn/base_image/unpkg:1.0.0
docker push harbor.yn.bjgykj.cn/base_image/unpkg:1.0.0
```
**docker image使用**
```bash
# 拉取镜像
docker pull harbor.yn.bjgykj.cn/base_image/unpkg:1.0.0
```

```bash
# 启动unpkg
source run-ucdn.sh
```
## 注意事项
* 默认端口：容器`8080`，宿主机`3888`
* 默认公网NPM地址：`NPM_REGISTRY_URL=https://registry.npmjs.org`
* 默认私有NPM地址：`ORIGIN=http://webhub.bjgykj.cn/registry/`
* 可根据环境需要调整`run-ucdn.sh`脚本ENV配置
