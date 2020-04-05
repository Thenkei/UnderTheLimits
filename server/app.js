const express = require('express');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const IO = require('socket.io');

const Lobby = require('./src/lobby');

const APP_PORT = process.env.PORT || 3000;


(async () => {
  console.info('Building http server...');
  const app = express();
  const socketServer = http.createServer(app);

  console.info('Create socket.io instance...');
  const io = IO(socketServer, { path: '/api/socket.io' });

  console.info('Initializing lobby...');
  const lobby = new Lobby(io);
  lobby.register();

  console.info('Initializing morgan logger...');
  app.use(morgan('combined'));

  console.info('Hosting dist files...');
  app.use(express.static(path.join(__dirname, '../client/dist')));

  console.info('Hosting avatars files...');
  app.use('/avatars', express.static(path.join(__dirname, './avatars')));

  console.info('Hosting index.html...');
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  socketServer.listen(APP_PORT);
  console.info('-------------------------------');
  console.info(`- Server started on port ${APP_PORT} -`);
  console.info('-------------------------------');
})();
