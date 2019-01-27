FROM node:10.14.2-jessie

WORKDIR /server

ADD package.json /server/package.json

RUN yarn

COPY . /server

ENV NODE_PATH=/server/node_modules
ENV PATH=$PATH:/server/node_modules/.bin

EXPOSE 3001

CMD npm start
