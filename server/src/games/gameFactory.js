const UTLGame = require('./UnderTheLimits/utlGame');
const UTLPlus = require('./UnderTheLimits/utlPlus');
const Ninetynine = require('./Others/ninety-nine');

const GameFactory = (
  sequelizeInstance,
  channelOpts,
) => {
  if (channelOpts.gameType === 'ninety-nine') {
    return new Ninetynine(
      sequelizeInstance,
      channelOpts.channelName,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.maxPoints,
      channelOpts.isPrivate,
    );
  }
  if (channelOpts.gameType === 'utlgame') {
    return new UTLGame(
      sequelizeInstance,
      channelOpts.channelName,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.maxPoints,
      channelOpts.isPrivate,
    );
  }
  if (channelOpts.gameType === 'utlplus') {
    return new UTLPlus(
      sequelizeInstance,
      channelOpts.channelName,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.maxPoints,
      channelOpts.isPrivate,
    );
  }

  return new UTLGame(
    sequelizeInstance,
    channelOpts.channelName,
  );
};

module.exports = GameFactory;
