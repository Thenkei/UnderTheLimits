FROM node:10.14.2-jessie

WORKDIR /client

ADD package.json /client/package.json

RUN yarn

ENV NODE_PATH=/client/node_modules
ENV PATH=$PATH:/client/node_modules/.bin

COPY . /client

EXPOSE 3000
EXPOSE 35729

CMD npm start
