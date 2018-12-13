import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToTimer } from './Api';

class App extends Component {

  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }

  state = {
    timestamp: 'no timestamp yet'
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <div className="App">
              <p className="App-intro">
              This is the timer value: {this.state.timestamp}
              </p>
            </div>
        </header>
      </div>
    );
  }
}

export default App;
