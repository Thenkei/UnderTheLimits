const express = require('express');
const path = require('path');
const http = require('http');

const start = require('./server');

const APP_PORT = 3000;

const app = express();
app.use(express.static(path.join(__dirname, './client/dist')));

const socketServer = http.createServer(app);

(async () => {
  await start(socketServer);
  socketServer.listen(APP_PORT);
  console.warn('listening on port ', APP_PORT);
})();
