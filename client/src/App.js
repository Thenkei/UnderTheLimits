import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { error, createPlayer, updateLobby } from './Api';

class App extends Component {

  state = {
    timestamp: 'no timestamp yet'
  };

  constructor(props) {
    super(props);
    error((errMsg) => this.setState({
      error: errMsg
    }));

    updateLobby((err, lobby) => {
      console.warn( lobby );
      this.setState({
        lobby
      });
    })
  }

  renderStep() {
    if( !this.state.player || !this.state.player.name || !this.state.lobby ) {
      return (
        <React.Fragment>
          <input type="text" value={ this.state.playerName || "" } onChange={(e) => {
              this.setState( { playerName: e.target.value } );
          } }
          />
          <button onClick={() => {
                createPlayer( this.state.playerName, ( err, player ) => {
                  localStorage.setItem('utl-player', player);
                  this.setState({ player });
                } )
              }}
          >
            ok
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <p>LOBBY</p>
          { this.state.lobby.waitingPlayers.map( (p,i)=>{ return (<p key={i}>{p.name}</p>)})}
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          { this.state.error ? <p>{this.state.error}</p> : <p></p> }
          { this.state.player ? <p>Ready</p> : <p></p> }

            <div className="App">
              { this.renderStep() }
            </div>
        </header>
      </div>
    );
  }
}

export default App;
