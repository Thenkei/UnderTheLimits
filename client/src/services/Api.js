import openSocket from 'socket.io-client';

const socket = openSocket(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`, { path: '/api/socket.io' });

if (!global.socket) {
  global.socket = socket;
}

function addListener(name, cb) {
  if (!global.socket.hasListeners(name)) {
    global.socket.on(name, cb);
  }
}

// ADMINISTRATOR
function updateAdmin(cb) {
  addListener('updateAdmin', (response) => {
    cb(response.admin);
  });
}


// LOBBY
function createPlayer(playerName, cb) {
  global.socket.emit('createPlayer', playerName);
  addListener('playerCreated', lobbyResponse => cb(lobbyResponse.player));
}

function updateLobby(cb) {
  addListener('updateLobby', (lobbyResponse) => {
    cb(lobbyResponse.lobby);
  });
}

// GAMES
function updateChannel(cb) {
  addListener('updateChannel', channelResponse => cb(channelResponse.channel));
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
  addListener('err', errMsg => cb(errMsg));
}

function success(cb) {
  addListener('success', successMsg => cb(successMsg));
}

function chatMessages(cb) {
  addListener('chat/message', msg => cb(msg));
}

function sendMessage(msg) {
  global.socket.emit('chat/message', msg);
}

function disconnect(cb) {
  addListener('disconnect', (reason) => {
    let res = false;
    if (reason === 'io server disconnect') {
      // the disconnection was initiated by the server, you have been kicked
      res = true;
    }
    cb(res);
  });
}

export {
  updateAdmin,
  createPlayer,
  chatMessages,
  sendMessage,
  updateLobby,
  updateChannel,
  createChannel,
  startGame,
  selectedAnswers,
  selectedJudgment,
  gotoChannel,
  error,
  success,
  disconnect,
};
