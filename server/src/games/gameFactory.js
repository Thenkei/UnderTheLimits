const UTLGame = require('./UnderTheLimits/utlGame');
const UTLPlus = require('./UnderTheLimits/utlPlus');

const GameFactory = (
  channelOpts,
) => {
  if (channelOpts.gameType === 'utlgame') {
    return new UTLGame(
      channelOpts.channelName,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.maxPoints,
    );
  }
  if (channelOpts.gameType === 'utlplus') {
    return new UTLPlus(
      channelOpts.channelName,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.playerMaxPoint,
    );
  }

  return new UTLGame(
    channelOpts.channelName,
  );
};

module.exports = GameFactory;
