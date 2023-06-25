FROM node:19-alpine3.17

WORKDIR /api

COPY . /api

RUN apk update && apk upgrade -f && npm install -g pnpm

RUN pnpm install

CMD [ "pnpm", "start" ]
