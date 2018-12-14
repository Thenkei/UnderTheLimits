FROM node:10.14.2-jessie

WORKDIR /server

ADD package.json /server/package.json

COPY . /server

RUN yarn

ENV NODE_PATH=/server/node_modules
ENV PATH=$PATH:/server/node_modules/.bin

COPY . /server

EXPOSE 3001

CMD npm start
