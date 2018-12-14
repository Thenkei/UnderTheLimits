(async () => {
  const io = require( 'socket.io' )();
  const Channel = require( './src/channel' );
  const Player = require( './src/player' );
  try {
    const config = {
      db: 'utl',
      db_user: 'user',
      db_pwd: 'pwd',
      db_host: '0.0.0.0',
      db_log: false
    };

    const db = await require('./src/models')(config);
    let TEST_CHANNEL = new Channel( [ new Player( 'aaa' ), new Player( 'bbb' ), new Player( 'ccc' ) ] );
    TEST_CHANNEL.addPlayer( new Player( 'ddd' ) );
    console.log(TEST_CHANNEL.getPlayersCount());
    TEST_CHANNEL.removePlayerByName( 'aaa' );
    console.log(TEST_CHANNEL.getPlayersCount());
    TEST_CHANNEL.addPlayer( new Player( 'eee' ) );
    TEST_CHANNEL.listPlayers();
    io.on( 'connection', ( client ) => {
        client.on( 'subscribeToTimer', ( interval ) => {
            console.log( 'client is subscribing to timer with interval ', interval );
            setInterval( () => {
                client.emit( 'timer', new Date() );
            }, interval );
        } );
        client.on( 'createPlayer', ( playerName ) => {
          console.warn( 'createPlayer ' + playerName );
            client.emit( 'playerCreated', new Player( playerName ) );
        } );
    } );
  } catch (err) {
    console.error(err);
  }
  const port = 3001;
  io.listen( port );
  console.log( 'listening on port ', port );
})();
