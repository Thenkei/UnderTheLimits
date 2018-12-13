FROM node:10.14.2-jessie

ENV NODE_PATH=/client/node_modules
ENV PATH=$PATH:/client/node_modules/.bin

COPY . /server
WORKDIR /server

EXPOSE 3001
RUN npm install
CMD npm start
