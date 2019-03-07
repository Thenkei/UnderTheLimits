const IO = require('socket.io');
const DataBase = require('./src/models');
const DBProvider = require('./src/utils/dbProvider');
const SocketProvider = require('./src/utils/socketProvider');
const Lobby = require('./src/lobby');

const createDBConfig = require('./createDBConfig');

async function start(existingServer) {
  const io = IO(existingServer, { path: '/api/socket.io' });

  const config = createDBConfig();
  const dataBase = await DataBase(config);

  SocketProvider.set(io);
  DBProvider.set(dataBase);

  const lobby = new Lobby();
  lobby.register();

  return io;
}

module.exports = start;
