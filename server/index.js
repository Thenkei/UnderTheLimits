const io = require( 'socket.io' )();
const Channel = require( './channel' );
const Player = require( './player' );


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
} );

const port = 3000;
io.listen( port );
console.log( 'listening on port ', port );
