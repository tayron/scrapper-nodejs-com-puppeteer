#!/bin/bash
clear 
docker build -t hospedaapp/santander-relatorio-proposta:prod .
## docker rm poc
#docker run -it --name poc --rm hospedaapp/poc:prod node /app/dist/index.js
docker run -it --name poc --rm hospedaapp/santander-relatorio-proposta:prod /bin/sh