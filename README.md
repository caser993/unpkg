# UNPKG (fork)

简体中文 | [English](./README.en.md)

[UNPKG](https://unpkg.com) is a fast, global [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) for everything on [npm](https://www.npmjs.com/).

**此fork的目标是：**

* 使自托管 Unpkg 变得更容易。
* 保持上游兼容。
* 使依赖项保持最新。
* 不进行任何功能更改或添加新功能。
* 新增`Dockerfile`镜像配置。
* 新增`docker-compose.yaml`配置(未实测)。
* 配置docker`run-ucdn.sh`启动脚本。
------

## 开发

准备：
```bash
git clone https://github.com/caser993/unpkg.git
cd unpkg
pnpm i
cp .env.sample .env.local # and edit the env.local config for local development
```

dev:

```bash
pnpm watch
pnpm serve
```
## 构建和部署

```bash
cp .env.sample .env.prod # and edit the env.prod config for production
set NODE_ENV=production # or staging
pnpm build
pnpm pack
```
将生成一个类似“unpkg-<version>.tgz”的文件。
使用 pm2 将其部署到您的服务器中：

```bash
tar zxvf unpkg-<version>.tgz
cd package
# npm i --omit dev
pnpm i -P
pm2 -n unpkg start.js
```
### Docker部署
> 使用docker部署的话，上述构建部署可忽略，直接使用docker方式部署（更推荐）
**docker image制作**

```bash
docker build . -t ebear/unpkg
```
**docker image发布**
```bash
# 内部私有docker registry
docker tag ebear/unpkg ${私有docker仓库目录}/unpkg:latest
docker push ${私有docker仓库目录}/unpkg:latest
```
**docker image使用**
```bash
# 拉取镜像
docker pull ${私有docker仓库目录}/unpkg:latest
```
**docker 启动配置**
启动可直接修改`run-ucdn.sh`进行快速docker启动或者，或者自行编写启动脚本

方式一：
```bash
# 直接修改使用已配置脚本修改启动unpkg方式
vim  run-ucdn.sh
#  -p 3888:8080 \
# -e NODE_ENV=production \
# -e NPM_REGISTRY_URL=https://registry.npmjs.org \
# -e ORIGIN=http://127.0.0.1:4873 \
# ${私有docker仓库目录}/unpkg:latest
source run-ucdn.sh
```
方式二：
```bash
docker run -d -it --name ucdn --restart=always \
  -p 3888:8080 \
  -e NODE_ENV=production \
  -e NPM_REGISTRY_URL=https://registry.npmjs.org \
  -e ORIGIN=http://127.0.0.1:4873 \
  harbor.***.com/base_image/unpkg:latest
```
* 默认端口：容器`8080`，宿主机`3888`(根据自己实际情况调整)
* 默认公网NPM地址：`NPM_REGISTRY_URL=https://registry.npmjs.org`
* 默认私有NPM地址：`ORIGIN=http://http://127.0.0.1:4873`(根据自己实际私有库调整)

## 感谢
此方案非原创，在此感谢[renxia](https://github.com/renxia)的修改升级依赖的支持，本人仅对docker部署部分做了调整新增和一些依赖锁定；源仓库[unpkg](https://github.com/renxia/unpkg)
