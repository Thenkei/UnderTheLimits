const express = require('express');
const path = require('path');
const http = require('http');

const start = require('./server');

const APP_PORT = 3000;

const app = express();

const socketServer = http.createServer(app);

(async () => {
  await start(socketServer);
  app.use(express.static(path.join(__dirname, './client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
  });
  socketServer.listen(APP_PORT);
  console.warn('listening on port ', APP_PORT);
})();
