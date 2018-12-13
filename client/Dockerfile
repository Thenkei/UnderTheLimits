FROM node:10.14.2-jessie

ADD package.json /package.json

ENV NODE_PATH=/client/node_modules
ENV PATH=$PATH:/client/node_modules/.bin
RUN npm install

WORKDIR /client
ADD . /client

EXPOSE 3000
EXPOSE 35729

CMD npm start
