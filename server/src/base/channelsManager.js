const GameFactory = require('../games/gameFactory');

const MAX_DISCONNECTED_TIME = 120000;
const MAX_CHANNEL_COUNT = 24;

class ChannelsManager {
  constructor() {
    this.channels = [];
  }

  // adminPlayer.currentStatus = 'IN_CHANNEL';
  async createUtlChanel(admin, channelOpts = {}) {
    if (this.channels.length >= MAX_CHANNEL_COUNT) {
      throw new Error('Le serveur est complet, attendez qu\'un salon se libère !');
    }

    const utlGame = GameFactory(
      channelOpts,
    );

    await utlGame.init();
    utlGame.tryReconnectOrConnect(admin, admin.id);

    this.channels.push(utlGame);
    console.warn(`[ChannelsManager] channel ${utlGame.name} created owned by ${admin.username}`);
    return utlGame;
  }

  getChannelById(channelId) {
    return this.channels.find(c => c.id === channelId);
  }

  getChannelByPlayerId(playerId) {
    return this.channels.find(c => c.players.find(p => playerId === p.id));
  }

  setTimeoutDisconnectedFromChannel(socket, channel, io, updateLobby) {
    setTimeout(() => {
      this.disconnectedFromChannel(socket, channel, io, updateLobby);
    }, MAX_DISCONNECTED_TIME);
  }

  disconnectedFromChannel(socket, channel, io, updateLobby) {
    const removed = channel.removePlayerById(socket);

    if (removed) {
      const message = { isSystem: true, message: `${removed.name} a quité la partie.`, date: Date.now() };
      io.to(channel.id).emit('chat/message', message);

      console.log('[ChannelsManager] Player', removed.name, 'disconnected from channel', channel.name);
      io.to(channel.id).emit('updateChannel', channel.serialize());

      if (channel.players.length === 0) {
        this.channels.splice(this.channels.findIndex(c => c.id === channel.id), 1);
        console.log('[ChannelsManager] Remove channel', channel.name);
        updateLobby();
      }
    }
  }
}

module.exports = ChannelsManager;
