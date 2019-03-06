const UTLGame = require('../games/UnderTheLimits/utlGame');

const MAX_DISCONNECTED_TIME = 60000;

class ChannelsManager {
  constructor() {
    this.channels = [];
  }

  // adminPlayer.currentStatus = 'IN_CHANNEL';
  async createUtlChanel(channelName, admin) {
    // TODO replace with gameFactory
    const utlGame = new UTLGame(channelName, admin);
    await utlGame.init();

    utlGame.addPlayer(admin);
    this.channels.push(utlGame);
    return utlGame;
  }

  getChannelById(channelId) {
    return this.channels.find(c => c.id === channelId);
  }

  setTimeoutDisconnectedFromChannel(socket) {
    setTimeout(() => {
      this.channels.forEach((channel, index, array) => {
        const removed = channel.removePlayerById(socket);
        if (removed) {
          console.log('[ChannelsManager] Dangling disconnected player', removed.name, 'disconnected from channel', channel.name);
          // SocketProvider.get().to(channel.id).emit('updateChannel', c.serialize());
          if (channel.players.length === 0) {
            array.splice(index, 1);
            console.log('[ChannelsManager] Remove channel', channel.name);
          }
        }
      });
    }, MAX_DISCONNECTED_TIME);
  }
}

module.exports = ChannelsManager;
