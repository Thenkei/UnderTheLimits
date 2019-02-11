const IO = require('socket.io');
const Player = require('./src/player');
const Channel = require('./src/channel');
const DataBase = require('./src/models');

const createDBConfig = require('./createDBConfig');


const MAX_PLAYERS_IN_LOBBY = 100;
const MAX_CHANNEL_COUNT = 7;
const SOCKET_ROOM_LOBBY = 'LOBBY';

async function start(existingServer) {
  const io = IO(existingServer);
  try {
    const config = createDBConfig();

    const CONNECTED_PLAYERS = [];
    const CHANNELS = [];

    const dataBase = await DataBase(config);

    io.on('connection', (client) => {
      client.join(SOCKET_ROOM_LOBBY);
      client.on('disconnect', () => {
        const disconnectedPlayerIndex = CONNECTED_PLAYERS.findIndex(p => p.id === client.id);
        if (disconnectedPlayerIndex !== -1) {
          console.log('Player', CONNECTED_PLAYERS.splice(disconnectedPlayerIndex, 1)[0].name, ' got disconnected from lobby');

          CHANNELS.forEach((c, index, array) => {
            const channelId = c.removePlayerById(client.id);
            if (channelId !== -1) {
              io.to(c.id).emit('updateChannel', c.serialize());

              if (c.players.length === 0) {
                array.splice(index, 1);
                console.log('Remove channel ', c.name);
              }
            }
          });
        }

        const waitingPlayers = CONNECTED_PLAYERS.filter(p => p.currentStatus === 'LOBBY');
        io.to(SOCKET_ROOM_LOBBY).emit('updateLobby', {
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
          io.to(SOCKET_ROOM_LOBBY).emit('updateLobby', {
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
          client.emit('err', 'Le serveur est complet, attendez qu\'un salon se libère !');
        } else {
          try {
            const currentPlayer = CONNECTED_PLAYERS.find(p => p.id === client.id);
            if (!currentPlayer) return;
            const newChannel = new Channel([currentPlayer], channelName, currentPlayer);
            currentPlayer.currentStatus = 'IN_CHANNEL';
            await newChannel.init(dataBase);
            CHANNELS.push(newChannel);
            console.warn(`channel ${channelName} created`);

            const waitingPlayers = CONNECTED_PLAYERS.filter(p => p.currentStatus === 'LOBBY');
            io.to(SOCKET_ROOM_LOBBY).emit('updateLobby', {
              lobby: {
                waitingPlayers,
                channels: CHANNELS.map(c => ({
                  name: c.name,
                  id: c.id,
                })),
              },
            });
            client.leave(SOCKET_ROOM_LOBBY);
            client.join(newChannel.id);

            client.emit('updateChannel', newChannel.serialize());
          } catch (err) {
            console.error(err);
          }
        }
      });

      client.on('gotoChannel', (channelId) => {
        const channel = CHANNELS.find(c => c.id === channelId);
        const currentPlayer = CONNECTED_PLAYERS.find(p => p.id === client.id);
        if (!channel) return;
        if (!currentPlayer) return;

        // Check channel not running
        if (channel.isRunning()) {
          client.emit('err', 'Partie en cours, impossible de rejoindre ce salon.');
          return;
        }
        // Check channel not full
        if (channel.isFull()) {
          client.emit('err', `Plus de place dans le salon ${channel.name} !`);
          return;
        }

        currentPlayer.currentStatus = 'IN_CHANNEL';
        channel.addPlayer(currentPlayer);

        const waitingPlayers = CONNECTED_PLAYERS.filter(p => p.currentStatus === 'LOBBY');
        io.to(SOCKET_ROOM_LOBBY).emit('updateLobby', {
          lobby: {
            waitingPlayers,
            channels: CHANNELS.map(c => ({
              name: c.name,
              id: c.id,
            })),
          },
        });
        client.leave(SOCKET_ROOM_LOBBY);
        client.join(channelId);

        io.to(channelId).emit('updateChannel', channel.serialize());
      });

      client.on('nextRound', (channelId) => {
        const channel = CHANNELS.find(c => c.id === channelId);
        if (!channel) return;
        // Check channel cannot start
        if (!channel.canStart()) {
          client.emit('err', 'Il n\'y a pas assez de joueurs dans ce salon !');
          return;
        }

        channel.nextRound();
        console.warn(`channel ${channel.name} next round starting...`);

        io.to(channelId).emit('updateChannel', channel.serialize());

        channel.interval = setInterval(() => { channel.timer -= 1; io.to(channelId).emit('updateChannel', channel.serialize()); }, 1000);
        setTimeout(() => { clearInterval(channel.interval); channel.judgementState(); io.to(channelId).emit('updateChannel', channel.serialize()); }, channel.getAnwersTime());
      });

      client.on('selectedAnswers', (channelId, answers) => {
        const channel = CHANNELS.find(c => c.id === channelId);
        if (!channel) return;
        const currentPlayer = channel.players.find(p => p.id === client.id);
        currentPlayer.answers = answers;

        io.to(channelId).emit('updateChannel', channel.serialize());
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
        io.to(channelId).emit('updateChannel', channel.serialize());
      });
    });
  } catch (err) {
    console.error(err);
  }
  return io;
}

module.exports = start;
