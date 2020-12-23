# FROM node:14-alpine

# RUN uname -a
# RUN addgroup -S vsuser && adduser -S -G vsuser vsuser
# RUN apk add --no-cache sudo
# ENV HOME=/home/vsuser
# COPY package.json $HOME/apphome/
# COPY package-lock.json $HOME/apphome/
# RUN sudo chown -R vsuser:vsuser $HOME/*
# RUN sudo chown -R vsuser:vsuser $HOME/apphome/node_modules
# USER vsuser
# WORKDIR $HOME/apphome
# COPY . $HOME/apphome/
# RUN npm install
# EXPOSE 50051
# RUN npm run psi
# RUN echo $HOME
# # CMD [ "npm", "run", "ng", "run", "api-auth:serve" ]
# CMD [ "npm", "run", "ng", "--version" ]

### STAGE 1: Build ###
FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 50051
RUN npm run psi
RUN npm run build