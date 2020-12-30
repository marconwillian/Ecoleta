FROM node:12-alpine

ARG CACHEBUST=1

RUN mkdir -p /home/node/ecoleta/node_modules && mkdir -p /home/node/ecoleta/dist && chown -R node:node /home/node/ecoleta

WORKDIR /home/node/ecoleta

COPY --chown=node:node ./package.json ./yarn.* ./

USER node

RUN yarn

COPY --chown=node:node ./ .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
