import openSocket from 'socket.io-client';

const socket = openSocket(`http://${window.location.hostname}:3000`, { path: '/api/socket.io' });

function createPlayer(playerName, cb) {
  global.socket.emit('createPlayer', playerName);
  global.socket.on('playerCreated', lobbyResponse => cb(null, lobbyResponse.player));
}

function updateLobby(cb) {
  global.socket.on('updateLobby', (lobbyResponse) => {
    cb(null, lobbyResponse.lobby);
  });
}

function updateChannel(cb) {
  global.socket.on('updateChannel', (channelResponse) => {
    cb(null, channelResponse.channel);
  });
}

function gotoChannel(channelId) {
  global.socket.emit('gotoChannel', channelId);
}

function createChannel(channelName) {
  global.socket.emit('createChannel', channelName);
}

function startGame() {
  socket.emit('nextRound');
}

function selectedAnswers(answers) {
  socket.emit('selectedAnswers', answers);
}

function selectedJudgment(winnerId) {
  socket.emit('selectedJudgment', winnerId);
}

function error(cb) {
  global.socket.on('err', errMsg => cb(errMsg));
}

function success(cb) {
  global.socket.on('success', successMsg => cb(successMsg));
}

if (!global.socket) {
  global.socket = socket;
}


export {
  createPlayer,
  updateLobby,
  updateChannel,
  createChannel,
  startGame,
  selectedAnswers,
  selectedJudgment,
  gotoChannel,
  error,
  success,
};
