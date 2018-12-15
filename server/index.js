const IO = require('socket.io');
const Channel = require('./src/channel');
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

    const LOBBY = { waitingPlayers: [], waitingChannel: [] };

    await require('./src/models')(config); // eslint-disable-line global-require
    const TEST_CHANNEL = new Channel([new Player('aaa'), new Player('bbb'), new Player('ccc')]);
    TEST_CHANNEL.addPlayer(new Player('ddd'));
    TEST_CHANNEL.removePlayerByName('aaa');
    TEST_CHANNEL.addPlayer(new Player('eee'));
    TEST_CHANNEL.listPlayers();
    io.on('connection', (client) => {
      client.on('disconnect', () => {
        console.log('client got disconnected @TODO');
        io.sockets.emit('updateLobby', { lobby: LOBBY });
      });
      client.on('init', (interval) => {
        console.warn('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
      });
      client.on('createPlayer', (playerName) => {
        if (LOBBY.waitingPlayers.length >= MAX_PLAYERS_IN_LOBBY) {
          client.emit('err', 'failed to create new player - lobby is full !');
        }
        const doesNameAlreadyExist = LOBBY.waitingPlayers.find(p => p.name === playerName);
        if (!doesNameAlreadyExist) {
          console.warn(`Adding player ${playerName} to lobby`);
          const player = new Player(playerName);
          client.emit('playerCreated', { player, lobby: LOBBY });
          LOBBY.waitingPlayers.push(new Player(playerName));
          io.sockets.emit('updateLobby', { lobby: LOBBY });
        } else {
          console.warn(`Failed adding ${playerName} to lobby, already exist`);
          client.emit('err', 'failed to create new player - name already exist');
        }
        console.warn(LOBBY);
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
