const IO = require('socket.io');
const Player = require('./src/player');
const Channel = require('./src/channel');
const DataBase = require('./src/models');

const MAX_PLAYERS_IN_LOBBY = 10;
const MAX_CHANNEL_COUNT = 10;

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
    const CHANNELS = [];

    const dataBase = await DataBase(config);

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
          io.sockets.emit('updateLobby', {
            lobby: {
              waitingPlayers,
              channels: CHANNELS,
            },
          });
        } else {
          console.warn(`Failed adding ${playerName} to lobby, already exist`);
          client.emit('err', 'failed to create new player - name already exist');
        }
      });
      client.on('createChannel', async (channelName) => {
        if (CHANNELS.length >= MAX_CHANNEL_COUNT) {
          client.emit('err', 'failed to create new channel - no more space for new channel');
        } else {
          try {
            const currentPlayer = CONNECTED_PLAYERS.find(p => p.id === client.id);
            const newChannel = new Channel([currentPlayer], channelName, dataBase);
            await newChannel.init(dataBase);
            CHANNELS.push(newChannel);
            console.warn(`channel ${channelName} created`);
          } catch (err) {
            console.error(err);
          }

          io.sockets.emit('updateLobby', {
            lobby: {
              channels: CHANNELS,
            },
          });
        }
      });
      client.on('startGame', (channelName) => {
        const waitingPlayers = CONNECTED_PLAYERS.filter(p => p.currentStatus === 'LOBBY');
        const currentLobby = CHANNELS.find(c => c.name === channelName);
        currentLobby.initializePlayersCards();
        io.sockets.emit('updateLobby', {
          lobby: {
            waitingPlayers,
            channels: CHANNELS,
          },
        });
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
