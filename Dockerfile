FROM node:10-alpine

LABEL maintainer="bananaprotocol@protonmail.com"

WORKDIR /usr/share/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV BOT_TOKEN=

CMD ["node", "bot.js"]
