const ChannelsManager = require('./base/channelsManager');
const UsersManager = require('./base/usersManager');
const SocketProvider = require('./utils/socketProvider');

const MAX_CHANNEL_COUNT = 12;
const SOCKET_ROOM_LOBBY = 'LOBBY';

class Lobby {
  constructor() {
    this.usersManager = new UsersManager();
    this.channelsManager = new ChannelsManager();
  }

  serialize() {
    const waitingUsers = this.usersManager.waitingUsers();
    return {
      lobby:
      {
        waitingPlayers: waitingUsers,
        channels: this.channelsManager.channels.map(c => (
          {
            name: c.name,
            id: c.id,
          })),
      },
    };
  }

  register() {
    const io = SocketProvider.get();

    io.on('connection', (client) => {
      // JOIN CHANNEL LOBBY
      client.join(SOCKET_ROOM_LOBBY);

      // DISCONNECT FROM LOBBY
      client.on('disconnect', () => {
        const disconnected = this.usersManager.removeUserById(client.id);
        console.log('Player', disconnected ? disconnected.name : client.id, ' got disconnected from lobby');
        if (disconnected) {
          this.channelsManager.setTimeoutDisconnectedFromChannel(
            client.id,
          );
        }

        io.to(SOCKET_ROOM_LOBBY).emit('updateLobby', this.serialize());
      });

      client.on('createPlayer', async (playerName) => {
        if (!playerName) { return; }

        try {
          const player = await this.usersManager.findOrCreateUserFromDB(
            playerName,
            client.id,
          );
          client.emit('playerCreated', { player });
          io.to(SOCKET_ROOM_LOBBY).emit('updateLobby', this.serialize());
        } catch (err) {
          client.emit('err', err.message);
        }
      });

      // CREATE CHANNEL FROM LOBBY
      client.on('createChannel', async (channelName) => {
        const currentPlayer = this.usersManager.getUserBySocket(client.id);
        if (!currentPlayer) return;

        if (this.channelsManager.channels.length >= MAX_CHANNEL_COUNT) {
          client.emit('err', 'Le serveur est complet, attendez qu\'un salon se libère !');
        } else {
          const channel = await this.channelsManager.createUtlChanel(
            channelName,
            currentPlayer,
          );
          console.warn(`[ChannelsManager] channel ${channelName} created owned by ${currentPlayer.username}`);
          currentPlayer.currentStatus = 'IN_CHANNEL';

          client.leave(SOCKET_ROOM_LOBBY);
          client.join(channel.id);

          client.emit('updateChannel', channel.serialize());
          io.to(SOCKET_ROOM_LOBBY).emit('updateLobby', this.serialize());
        }
      });

      client.on('gotoChannel', (channelId) => {
        const channel = this.channelsManager.getChannelById(channelId);
        const currentPlayer = this.usersManager.getUserBySocket(client.id);
        if (!channel) return;
        if (!currentPlayer) return;

        const canReconnect = channel.canReconnect(currentPlayer.name);

        try {
          if (canReconnect) {
            canReconnect.id = client.id;
          } else {
            channel.addPlayer(currentPlayer);
          }
          currentPlayer.currentStatus = 'IN_CHANNEL';

          client.leave(SOCKET_ROOM_LOBBY);
          client.join(channelId);
          io.to(channel.id).emit('updateChannel', channel.serialize());
        } catch (err) {
          client.emit('err', err);
        }
      });

      client.on('nextRound', () => {
        const channel = this.channelsManager.getChannelById(Object.values(client.rooms)[0]);
        if (!channel) return;

        // Check channel cannot start
        if (!channel.canStart()) {
          client.emit('err', 'Il n\'y a pas assez de joueurs dans ce salon !');
          return;
        }

        channel.nextRound();
        console.warn(`channel ${channel.name} next round starting...`);

        io.to(channel.id).emit('updateChannel', channel.serialize());

        channel.interval = setInterval(() => { channel.timer -= 1; io.to(channel.id).emit('updateChannel', channel.serialize()); }, 1000);
        setTimeout(() => { clearInterval(channel.interval); channel.judgementState(); io.to(channel.id).emit('updateChannel', channel.serialize()); }, channel.getAnwersTime());
      });

      client.on('selectedAnswers', (answers) => {
        const channel = this.channelsManager.getChannelById(Object.values(client.rooms)[0]);
        if (!channel) return;
        const currentPlayer = channel.players.find(p => p.id === client.id);
        currentPlayer.answers = answers;

        io.to(channel.id).emit('updateChannel', channel.serialize());
      });

      client.on('selectedJudgment', (judgment) => {
        const channel = this.channelsManager.getChannelById(Object.values(client.rooms)[0]);
        if (!channel) return;

        const resultat = channel.judge(judgment);

        if (resultat.gameWinner) {
          io.to(channel.id).emit('success', `Le vainqueur est ${resultat.winner.name}`);
        } else {
          io.to(channel.id).emit('success', `${resultat.winner.name} remporte la manche !`);
        }

        io.to(channel.id).emit('updateChannel', channel.serialize());
      });
    });
  }
}

module.exports = Lobby;
