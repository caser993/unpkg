# please update ORIGIN and ${image name}
docker run -d -it --name ucdn --restart=always \
  -p 3888:8080 \
  -e NODE_ENV=production \
  -e NPM_REGISTRY_URL=https://registry.npmjs.org \
  -e ORIGIN=http://127.0.0.1:4873 \
  ${image name}
