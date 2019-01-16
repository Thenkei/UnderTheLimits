const IO = require('socket.io');
const Player = require('./src/player');
const Channel = require('./src/channel');
const DataBase = require('./src/models');

const MAX_PLAYERS_IN_LOBBY = 100;
const MAX_CHANNEL_COUNT = 6;

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
          console.log('Player', CONNECTED_PLAYERS.splice(disconnectedPlayerIndex, 1)[0].name, ' got disconnected from lobby');

          CHANNELS.forEach((c, index, array) => {
            const channelId = c.removePlayerById(client.id);
            if (channelId !== -1) {
              io.to(c.id).emit('updateChannel', { channel: c });

              if (c.players.length === 0) {
                array.splice(index, 1);
                console.log('Remove channel ', c.name);
              }
            }
          });
        }

        const waitingPlayers = CONNECTED_PLAYERS.filter(p => p.currentStatus === 'LOBBY');
        io.sockets.emit('updateLobby', {
          lobby: {
            waitingPlayers,
            channels: CHANNELS.map(c => ({
              name: c.name,
              id: c.id,
            })),
          },
        });
      });

      client.on('createPlayer', (playerName) => {
        if (!playerName) {
          return;
        }
        const waitingPlayers = CONNECTED_PLAYERS.filter(p => p.currentStatus === 'LOBBY');

        if (waitingPlayers.length >= MAX_PLAYERS_IN_LOBBY) {
          client.emit('err', 'Impossible de créer un nouveau joueur, le lobby est plein !');
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
              channels: CHANNELS.map(c => ({
                name: c.name,
                id: c.id,
              })),
            },
          });
        } else {
          console.warn(`Failed adding ${playerName} to lobby, already exist`);
          client.emit('err', 'Ce nom existe déjà !');
        }
      });

      client.on('createChannel', async (channelName) => {
        if (CHANNELS.length >= MAX_CHANNEL_COUNT) {
          client.emit('err', `Plus de place dans le salon ${channelName} !`);
        } else {
          try {
            const currentPlayer = CONNECTED_PLAYERS.find(p => p.id === client.id);
            if (!currentPlayer) return;
            const newChannel = new Channel([currentPlayer], channelName, currentPlayer);
            currentPlayer.currentStatus = 'WAITING_GAME';
            await newChannel.init(dataBase);
            CHANNELS.push(newChannel);
            console.warn(`channel ${channelName} created`);

            io.sockets.emit('updateLobby', {
              lobby: {
                channels: CHANNELS.map(c => ({
                  name: c.name,
                  id: c.id,
                })),
              },
            });
            client.join(newChannel.id);

            client.emit('updateChannel', { channel: newChannel });
          } catch (err) {
            console.error(err);
          }
        }
      });

      client.on('gotoChannel', (channelId) => {
        const channel = CHANNELS.find(c => c.id === channelId);
        if (!channel) return;
        // Check channel not running
        if (channel.isRunning()) {
          client.emit('err', 'Partie en cours, impossible de rejoindre ce salon.');
          return;
        }
        channel.addPlayer(CONNECTED_PLAYERS.find(p => p.id === client.id));
        io.sockets.emit('updateLobby', {
          lobby: {
            channels: CHANNELS.map(c => ({
              name: c.name,
              id: c.id,
            })),
          },
        });
        client.join(channelId);

        io.to(channelId).emit('updateChannel', { channel });
      });

      client.on('nextRound', (channelId) => {
        const channel = CHANNELS.find(c => c.id === channelId);
        if (!channel) return;
        channel.nextRound();
        console.warn(`channel ${channel.name} next round starting...`);

        io.to(channelId).emit('updateChannel', { channel });
        setTimeout(() => { channel.judgementState(); io.to(channelId).emit('updateChannel', { channel }); }, 30000);
      });

      client.on('selectedAnswers', (channelId, answers) => {
        const channel = CHANNELS.find(c => c.id === channelId);
        if (!channel) return;
        const currentPlayer = channel.players.find(p => p.id === client.id);
        currentPlayer.answers = answers;

        io.to(channelId).emit('updateChannel', { channel });
      });

      client.on('selectedJudgment', (channelId, judgment) => {
        const channel = CHANNELS.find(c => c.id === channelId);
        if (!channel) return;
        const resultat = channel.judge(judgment);
        if (resultat.gameWinner) {
          io.to(channelId).emit('success', `Le vainqueur est ${resultat.winner.name}`);
        } else {
          io.to(channelId).emit('success', `${resultat.winner.name} remporte la manche !`);
        }
        io.to(channelId).emit('updateChannel', { channel });
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
