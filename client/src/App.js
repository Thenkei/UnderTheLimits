import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToTimer, createPlayer } from './Api';

class App extends Component {

  state = {
    timestamp: 'no timestamp yet',
    playerName: ''
  };

  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
            <div className="App">
              <input type="text" value={ this.state.playerName || "" } onChange={(e) => {
                  this.setState( { playerName: e.target.value } );
              } }
              />
            <button onClick={() => {
                  createPlayer( this.state.playerName, ( player ) => {
                    this.setState({ player });
                  } )
                }}
            >
              ok
            </button>
            </div>
        </header>
      </div>
    );
  }
}

export default App;
