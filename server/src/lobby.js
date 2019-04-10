const ChannelsManager = require('./base/channelsManager');
const UsersManager = require('./base/usersManager');
const SocketProvider = require('./utils/socketProvider');
const AvataGenerator = require('./utils/avatarGenerator');

const SOCKET_ROOM_LOBBY = 'LOBBY';

class Lobby {
  constructor() {
    this.usersManager = new UsersManager();
    this.channelsManager = new ChannelsManager();
    this.avataGenerator = new AvataGenerator();
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
          await this.avataGenerator.generate(playerName);
          const player = await this.usersManager.findOrCreateUserFromDB(
            playerName,
            client.id,
          );
          client.emit('playerCreated', { player });
          const send = this.serialize();
          send.lobby.event = 'playerCreated';
          io.to(SOCKET_ROOM_LOBBY).emit('updateLobby', send);
        } catch (err) {
          client.emit('err', err.message);
        }
      });

      // CREATE CHANNEL FROM LOBBY
      client.on('createChannel', async (channelReq) => {
        const currentPlayer = this.usersManager.getUserBySocket(client.id);
        if (!currentPlayer) return;

        try {
          const channel = await this.channelsManager.createUtlChanel(
            currentPlayer,
            channelReq.opts,
          );

          client.leave(SOCKET_ROOM_LOBBY);
          client.join(channel.id);
          channel.register(io, client, this.usersManager);

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
          channel.register(io, client, this.usersManager);
          io.to(channel.id).emit('updateChannel', channel.serialize());
        } catch (err) {
          client.emit('err', err.message);
        }
      });

      client.on('chat/message', (msg) => {
        const channel = this.channelsManager.getChannelById(Object.values(client.rooms)[0]);
        const currentPlayer = this.usersManager.getUserBySocket(client.id);
        const message = { player: currentPlayer.name, message: encodeURI(msg), date: Date.now() };

        if (msg.startsWith('/mp') && msg.split(' ').length > 2) {
          const [, to, realMessage] = RegExp(/\/mp (.*?) (.*)/g).exec(msg);
          const toPlayer = this.usersManager.findUser(to);
          if (!realMessage) {
            message.message = 'Le message est vide!';
          } else if (toPlayer && toPlayer.id !== currentPlayer.id) {
            message.message = encodeURI(realMessage);
            message.isPrivate = true;
            io.to(`${toPlayer.id}`).emit('chat/message', message);
          } else if (toPlayer && toPlayer.id === currentPlayer.id) {
            message.message = 'Tu fais n\'imp.';
          } else {
            message.message = 'Ce joueur n\'existe pas !';
          }
        } else {
          client.broadcast.to(channel ? channel.id : SOCKET_ROOM_LOBBY).emit('chat/message', message);
        }

        message.isPlayer = true;
        client.emit('chat/message', message);
      });
    });
  }
}

module.exports = Lobby;
