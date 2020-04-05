const UTLGame = require('./UnderTheLimits/utlGame');
const UTLPlus = require('./UnderTheLimits/utlPlus');
const Ninetynine = require('./Others/ninety-nine');

const GameFactory = (
  channelOpts,
) => {
  if (channelOpts.gameType === 'ninety-nine') {
    return new Ninetynine(
      channelOpts.channelName,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.maxPoints,
      channelOpts.isPrivate,
    );
  }
  if (channelOpts.gameType === 'utlgame') {
    return new UTLGame(
      channelOpts.channelName,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.maxPoints,
      channelOpts.isPrivate,
    );
  }
  if (channelOpts.gameType === 'utlplus') {
    return new UTLPlus(
      channelOpts.channelName,
      channelOpts.minPlayersCount,
      channelOpts.maxPlayersCount,
      channelOpts.maxPoints,
      channelOpts.isPrivate,
    );
  }

  return new UTLGame(
    channelOpts.channelName,
  );
};

module.exports = GameFactory;
