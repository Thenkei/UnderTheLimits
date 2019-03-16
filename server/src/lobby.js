const ChannelsManager = require('./base/channelsManager');
const UsersManager = require('./base/usersManager');
const SocketProvider = require('./utils/socketProvider');

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

        try {
          const channel = await this.channelsManager.createUtlChanel(
            channelName,
            currentPlayer,
          );

          client.leave(SOCKET_ROOM_LOBBY);
          client.join(channel.id);

          client.emit('updateChannel', channel.serialize());
          io.to(SOCKET_ROOM_LOBBY).emit('updateLobby', this.serialize());
        } catch (err) {
          client.emit('err', err.message);
        }
      });

      client.on('gotoChannel', (channelId) => {
        const channel = this.channelsManager.getChannelById(channelId);
        const currentPlayer = this.usersManager.getUserBySocket(client.id);
        if (!channel) return;
        if (!currentPlayer) return;

        try {
          channel.tryReconnectOrConnect(currentPlayer, client.id);
          client.leave(SOCKET_ROOM_LOBBY);
          client.join(channelId);
          io.to(channel.id).emit('updateChannel', channel.serialize());
        } catch (err) {
          client.emit('err', err.message);
        }
      });

      client.on('nextRound', () => {
        const channel = this.channelsManager.getChannelById(Object.values(client.rooms)[0]);
        if (!channel) return;

        try {
          channel.nextRound((player) => {
            this.usersManager.updateUserStatsPlayed(player);
          });

          io.to(channel.id).emit('updateChannel', channel.serialize());

          channel.interval = setInterval(() => { channel.timer -= 1; io.to(channel.id).emit('updateChannel', channel.serialize()); }, 1000);
          setTimeout(() => { clearInterval(channel.interval); channel.judgementState(); io.to(channel.id).emit('updateChannel', channel.serialize()); }, channel.getAnwersTime());
        } catch (err) {
          client.emit('err', err.message);
        }
      });

      client.on('selectedAnswers', (answers) => {
        const channel = this.channelsManager.getChannelById(Object.values(client.rooms)[0]);
        if (!channel) return;
        const currentGamePlayer = channel.players.find(p => p.id === client.id);
        currentGamePlayer.answers = answers;

        io.to(channel.id).emit('updateChannel', channel.serialize());
      });

      client.on('selectedJudgment', (judgment) => {
        const channel = this.channelsManager.getChannelById(Object.values(client.rooms)[0]);
        const currentPlayer = this.usersManager.getUserBySocket(client.id);
        if (!channel) return;
        if (!currentPlayer) return;

        channel.judge(
          judgment,
          (player, score, response) => {
            this.usersManager.updateUserStatsCumul(player, score);
            io.to(channel.id).emit('success', response);
          },
          (player, response) => {
            this.usersManager.updateUserStatsPoint(player);
            io.to(channel.id).emit('success', response);
          },
        );

        io.to(channel.id).emit('updateChannel', channel.serialize());
      });

      client.on('chat/message', (msg) => {
        const currentPlayer = this.usersManager.getUserBySocket(client.id);
        const message = `[${currentPlayer.name}] - ${encodeURI(msg)}`;
        io.emit('chat/message', message);
      });
    });
  }
}

module.exports = Lobby;
