import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

function init(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function createPlayer(playerName, cb) {
  socket.emit('createPlayer', playerName );
  socket.on( 'playerCreated', lobbyResponse => cb(null, lobbyResponse.player ));
}

function updateLobby(cb) {
  socket.on('updateLobby', lobbyResponse => {
    cb(null, lobbyResponse.lobby );
  });
}

function error(cb) {
  socket.on('err', errMsg => cb( errMsg ) );
}

export { init, createPlayer, updateLobby, error };
