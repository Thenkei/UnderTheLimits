import React, { Component } from 'react';
import './App.css';
import {
  error,
  success,
  createPlayer,
  updateLobby,
  createChannel,
  updateChannel,
  gotoChannel,
  startGame
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
import UnderTheLimits from './UnderTheLimits';


const DEFAULT_ERROR_TIMEOUT = 3000;
const DEFAULT_SUCCESS_TIMEOUT = 10000;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        playerName: (JSON.parse(localStorage.getItem('utl-player')) || []).name || ""
    };

    error((errMsg) => {
      this.setState({
        error: errMsg
      });
      setTimeout( (() => {
           this.setState({error:''});
      }), DEFAULT_ERROR_TIMEOUT);
    });

    success((successMsg) => {
      this.setState({
        success: successMsg
      });
      setTimeout( (() => {
           this.setState({success:''});
      }), DEFAULT_SUCCESS_TIMEOUT);
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

    updateChannel((err, channel) => {
        let me = channel.players.find(c => c.id === this.state.player.id);

        this.setState({
            player: me,
            currentChannel: channel
        });
    })

    this.onCreateChannel = this.onCreateChannel.bind(this);
  }

  onCreateChannel( channelName ) {
    createChannel( channelName );
  }

  renderStep() {
    if ( this.state.currentChannel ) {

      return (
      <Grid>
        <Row>
        {this.state.player.name === this.state.currentChannel.admin.name && (this.state.currentChannel.currentStatus === 'WAITING_GAME' || this.state.currentChannel.currentStatus === 'IDLE')? (
            <Col sm={4}>
              <Button onClick={()=> {
                  startGame( this.state.currentChannel.id );
              }}>Next round</Button>
            </Col>
          ) : (
        <div></div>
        )}

          <Col sm={4}>
            <h1><Label>{this.state.currentChannel.name}</Label></h1>
            <h3>{this.state.player.isGameMaster ?`${this.state.player.name} YOU ARE THE GAME MAAAASSSSSSTER` : `${this.state.player.name} you're just a regular man for this round`}</h3>
            {
            <dl>
            {this.state.currentChannel.players.map(item => (
                // Without the `key`, React will fire a key warning
                <React.Fragment key={item.id}>
                    <dt>{item.name}</dt>
                </React.Fragment>
            ))}
            </dl>
            }
          </Col>
        </Row>
        <Row>
            <UnderTheLimits player={this.state.player} currentChannel={this.state.currentChannel}/>
        </Row>
      </Grid>
      );
  } else if( this.state.lobby && this.state.player ) {
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
              this.state.lobby.channels.map( (c,i)=>{
                return (
                    <Form inline>
                    <Button key={i} onClick={()=> {
                      gotoChannel(c.id, (err, channel) => {
                        this.setState({ currentChannel: channel });
                      });
                    }}>{c.name}</Button>
                    </Form>
                )
              })
            }
          </Col>
        </Row>
      );
    } else {
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
                        localStorage.setItem('utl-player', JSON.stringify(player));
                        this.setState({ player });
                      } )
                    }}
                >
                  Ok
                </Button>
            </Form>
          </React.Fragment>
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
            { this.state.success ? <Alert bsStyle="success">{this.state.success}</Alert> : <p></p> }
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
