const UTLGame = require('./UnderTheLimits/utlGame');
const UTLPlus = require('./UnderTheLimits/utlPlus');

const GameFactory = (
  type,
  channelName,
  admin,
  channelOpts,
) => {
  if (type === 'utlgame') {
    return new UTLGame(
      channelName,
      admin,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.maxPoints,
    );
  }
  if (type === 'utlplus') {
    return new UTLPlus(
      channelName,
      admin,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.playerMaxPoint,
    );
  }

  return new UTLGame(
    channelName,
    admin,
  );
};

module.exports = GameFactory;
