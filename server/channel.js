class Channel {
    constructor( players ) {
        this.id =  Math.floor( Math.random() * Math.floor( 100 ) );
        this.players = players || [];
    }
    addPlayer( player ) {
        this.players.push( player );
    }
    removePlayerById( id ) {
        let toBeRemovedId = this.players.findIndex( ( p ) => p.id === id );
        if( toBeRemovedId !== -1 ) {
            this.players.splice( toBeRemovedId, 1 );
        }
    }
    removePlayerByName( name ) {
        let toBeRemovedId = this.players.findIndex( ( p ) => p.name === name );
        if( toBeRemovedId !== -1 ) {
            this.players.splice( toBeRemovedId, 1 );
        }
    }
    getPlayersCount() {
        return this.players.length;
    }
    listPlayers() {
        let debug = '';
        this.players.forEach( p => {
            debug += p.name + ' -- ';
        } );

        console.log( debug );
    }
}

module.exports = Channel;
