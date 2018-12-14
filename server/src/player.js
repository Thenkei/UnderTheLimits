class Player {
    constructor(name) {
        this.id =  Math.floor( Math.random() * Math.floor( 100 ) );
        this.name = name || '#VISITOR';
    }
}

module.exports = Player;
