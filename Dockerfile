FROM node:12-alpine

RUN mkdir -p /home/node/ecoleta/node_modules && mkdir -p /home/node/ecoleta/dist && chown -R node:node /home/node/ecoleta

WORKDIR /home/node/ecoleta

COPY --chown=node:node ./server/package.json ./server/yarn.* ./

USER node

RUN yarn

COPY --chown=node:node ./server/ .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/server.js"]
