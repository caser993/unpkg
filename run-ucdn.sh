docker run -d -it --name ucdn --restart=always \
  -p 3888:8080 \
  -e NODE_ENV=production \
  -e NPM_REGISTRY_URL=https://registry.npmjs.org \
  -e ORIGIN=http://webhub.bjgykj.cn/registry/ \
  harbor.yn.bjgykj.cn/base_image/unpkg:1.0.0
