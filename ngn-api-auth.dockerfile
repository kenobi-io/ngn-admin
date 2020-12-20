FROM node:14-alpine

RUN uname -a
ENV HOME=/home/node

COPY package.json $HOME/apphome/
COPY package-lock.json $HOME/apphome/

RUN chown -R node:node $HOME/*

USER node

WORKDIR $HOME/apphome

RUN npm install

COPY . $HOME/apphome/

EXPOSE 50051

RUN npm run psi

RUN echo $HOME

CMD [ "npm", "run", "ng", "run", "api-auth:serve" ]