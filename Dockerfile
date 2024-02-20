FROM node:20.11.0-slim

RUN apt-get update \
    && apt-get install -y wget openssl \
    && apt-get install -y openssl
    
RUN apt-get install -y yarn
RUN npm install -g pnpm

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

USER node

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]