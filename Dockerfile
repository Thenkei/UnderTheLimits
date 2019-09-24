FROM node:lts-jessie

RUN apt-get update
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

ENV NODE_ENV=development
ENV PORT=80

ADD package.json /app/package.json
COPY . /app

RUN cd /app && yarn --ignore-scripts

RUN echo "$momo"
RUN /app/node_modules/.bin/nodecipher decrypt /app/server/scripts/populate_question.sql.enc /app/server/scripts/populate_question.sql -p $momo
RUN /app/node_modules/.bin/nodecipher decrypt /app/server/scripts/populate_answer.sql.enc /app/server/scripts/populate_answer.sql -p $momo

RUN cd /app && npm rebuild sqlite3
RUN cd /app && npm rebuild canvas
RUN yarn --cwd /app/client build:qa
EXPOSE 80

CMD yarn --cwd /app start:qa
