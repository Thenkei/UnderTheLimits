const express = require('express');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const IO = require('socket.io');

const DataBase = require('./src/models');
const DBProvider = require('./src/utils/dbProvider');
const Lobby = require('./src/lobby');

const createDBConfig = require('./createDBConfig');

const APP_PORT = process.env.PORT || 3000;

const app = express();

const socketServer = http.createServer(app);

(async () => {
  const io = IO(socketServer, { path: '/api/socket.io' });

  const config = createDBConfig();
  const dataBase = await DataBase(config);

  DBProvider.set(dataBase);

  const lobby = new Lobby(io);
  lobby.register();
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
