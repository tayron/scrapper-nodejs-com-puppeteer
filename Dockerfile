FROM node:10.7.0-alpine AS base

ENV CHROME_BIN="/usr/bin/chromium-browser"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache chromium 

WORKDIR /app
COPY projeto /app
RUN mkdir ./upload && chmod 777 -R upload  
RUN npm install puppeteer@1.10.0

# Clean up
RUN rm -rf /var/cache/apk/*
RUN rm -rf /tmp/*
RUN rm -rf /var/log/*
RUN npm cache verify
RUN npm cache clean --force


