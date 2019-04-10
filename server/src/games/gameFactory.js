const UTLGame = require('./UnderTheLimits/utlGame');
const UTLPlus = require('./UnderTheLimits/utlPlus');

const GameFactory = (
  type,
  channelOpts,
) => {
  if (type === 'utlgame') {
    return new UTLGame(
      channelOpts.channelName,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.maxPoints,
    );
  }
  if (type === 'utlplus') {
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
