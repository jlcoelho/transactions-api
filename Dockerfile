FROM node:20.11.0-slim

RUN apt-get update -y
RUN apt-get install -y openssl
RUN npm install -g @nestjs/cli@10.3

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]