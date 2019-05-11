const express = require('express');
const path = require('path');
const http = require('http');
const morgan = require('morgan');

const start = require('./server');

const APP_PORT = process.env.PORT || 3000;

const app = express();

const socketServer = http.createServer(app);

(async () => {
  await start(socketServer);
  app.use(morgan('combined'))
  app.use(express.static(path.join(__dirname, './client/dist')));
  app.use('/avatars', express.static('./server/avatars'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
  });
  socketServer.listen(APP_PORT);
  console.warn('listening on port ', APP_PORT);
})();
