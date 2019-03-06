const UTLGame = require('../games/UnderTheLimits/utlGame');

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
}

module.exports = ChannelsManager;
