FROM node:fermium-alpine

ENV HOME /home/node/app

RUN apk update && apk add git && rm -rf /var/cache/apk/*

WORKDIR $HOME

RUN chown -R node:node $HOME
USER node
