FROM node:10.14.2-jessie

ENV NODE_ENV=development

ADD package.json /app/package.json
COPY . /app

RUN cd /app && yarn install:qa
# Please install SQLITE3 MANUALLYYYYYY
RUN yarn --cwd /app/server add sqlite3
RUN cd /app && npm rebuild node-sass
EXPOSE 80

CMD yarn --cwd /app start:qa
