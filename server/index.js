const IO = require('socket.io');
const Player = require('./src/player');

const MAX_PLAYERS_IN_LOBBY = 10;

async function start() {
  const io = IO();
  try {
    const config = {
      db: 'utl',
      db_user: 'user',
      db_pwd: 'pwd',
      db_host: 'mysql',
      db_log: false,
    };

    const CONNECTED_PLAYERS = [];

    await require('./src/models')(config); // eslint-disable-line global-require
    io.on('connection', (client) => {
      client.on('disconnect', () => {
        const disconnectedPlayerIndex = CONNECTED_PLAYERS.findIndex(p => p.id === client.id);
        if (disconnectedPlayerIndex !== -1) {
          CONNECTED_PLAYERS.splice(disconnectedPlayerIndex, 1);
          console.log('Player got disconnected');
        }
        const waitingPlayers = CONNECTED_PLAYERS.filter(p => p.currentStatus === 'LOBBY');
        io.sockets.emit('updateLobby', { lobby: { waitingPlayers } });
      });
      client.on('init', (interval) => {
        console.warn('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
      });
      client.on('createPlayer', (playerName) => {
        const waitingPlayers = CONNECTED_PLAYERS.filter(p => p.currentStatus === 'LOBBY');

        if (waitingPlayers.length >= MAX_PLAYERS_IN_LOBBY) {
          client.emit('err', 'failed to create new player - lobby is full !');
        }
        const doesNameAlreadyExist = CONNECTED_PLAYERS.find(p => p.name === playerName);
        if (!doesNameAlreadyExist) {
          console.warn(`Adding player ${playerName} to lobby`);
          const player = new Player(client.id, playerName);
          client.emit('playerCreated', { player });
          CONNECTED_PLAYERS.push(player);
          waitingPlayers.push(player);
          io.sockets.emit('updateLobby', { lobby: { waitingPlayers } });
        } else {
          console.warn(`Failed adding ${playerName} to lobby, already exist`);
          client.emit('err', 'failed to create new player - name already exist');
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
  const port = 3001;
  io.listen(port);
  console.warn('listening on port ', port);
}

(async () => {
  start();
})();
