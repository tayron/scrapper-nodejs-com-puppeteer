FROM node:10.7.0-alpine AS base

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    chromium 

WORKDIR /app
COPY projeto /app
RUN mkdir ./upload && chmod 777 -R upload  
RUN npm install puppeteer@1.10.0

