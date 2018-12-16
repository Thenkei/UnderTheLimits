import React, { Component } from 'react';
import './App.css';
import {
  error,
  createPlayer,
  updateLobby,
  createChannel,
  inChannel,
  gotoChannel
/*, startGame */
} from './Api';
import {
  Col,
  Button,
  FormControl,
  Row,
  Grid,
  Alert,
  Label,
  Form
} from 'react-bootstrap';
import CreateChannel from './CreateChannel';

const DEFAULT_ERROR_TIMEOUT = 3000;

class App extends Component {

  state = {
    timestamp: 'no timestamp yet'
  };

  constructor(props) {
    super(props);
    error((errMsg) => {
      this.setState({
        error: errMsg
      });
      setTimeout( (() => {
           this.setState({error:''});
      }), DEFAULT_ERROR_TIMEOUT);
    });

    updateLobby((err, responseLobby) => {
      let lobby = { waitingPlayers: [], channels: [] };

      if (this.state.lobby) {
        if( this.state.lobby.waitingPlayers ) {
          lobby.waitingPlayers = this.state.lobby.waitingPlayers;
        }
        if( this.state.lobby.channels ) {
          lobby.channels = this.state.lobby.channels;
        }
      }
      if (responseLobby.channels) {
        lobby.channels = responseLobby.channels;
      }
      if (responseLobby.waitingPlayers) {
        lobby.waitingPlayers = responseLobby.waitingPlayers;
      }

      this.setState({
        lobby
      });
    })

    inChannel((err, channel) => {
      this.setState({
        currentChannel: channel
      });
    })

    this.onCreateChannel = this.onCreateChannel.bind(this);
  }

  onCreateChannel( channelName ) {
    createChannel( channelName );
    //startGame( channelName );
  }

  renderStep() {
    if( !this.state.player || !this.state.player.name || !this.state.lobby ) {
      return (
        <React.Fragment>
          <Form inline>
              <FormControl
                type="text"
                value={ this.state.playerName || "" }
                placeholder="Name"
                onChange={(e) => {
                    this.setState( { playerName: e.target.value } );
                } }
              />
              <Button  bsStyle="success" onClick={() => {
                    createPlayer( this.state.playerName, ( err, player ) => {
                      localStorage.setItem('utl-player', player);
                      this.setState({ player });
                    } )
                  }}
              >
                Ok
              </Button>
          </Form>
        </React.Fragment>
      );
    } else if ( this.state.currentChannel ) {
      return (
        <p>{this.state.currentChannel.name}</p>
      );
    } else {
      return (
        <Row>
          <Col sm={4}>
            <CreateChannel onCreateChannel={this.onCreateChannel}/>
          </Col>
          <Col sm={4}>
            <h1><Label>PLAYERS</Label></h1>
            {
              this.state.lobby.waitingPlayers.map( (p,i)=>{
                return (<p key={i}>{p.name}</p>)
              })
            }
          </Col>
          <Col sm={4}>
            <h1><Label>CHANNELS</Label></h1>
            {
              this.state.lobby.channels.map( (p,i)=>{
                return (
                  <Form inline>
                    <p key={i}>{p.name}</p>
                  <Button onClick={()=> {
                      gotoChannel(p.id, (err, channel) => {
                        this.setState({ currentChannel: channel });
                      });
                    }}>Join</Button>
                  </Form>
                )
              })
            }
          </Col>
        </Row>
      );
    }
  }

  render() {
    return (
      <Grid>
        <Row className="App">
          <h1>Under the limits</h1>
          <header className="App-header">
            { this.state.error ? <Alert bsStyle="danger">{this.state.error}</Alert> : <p></p> }
              <div className="App">
                { this.renderStep() }
              </div>
          </header>
        </Row>
      </Grid>
    );
  }
}

export default App;
