import React, { Component } from 'react';
import './App.css';
import {
  Modal,
  Button,
  Form,
  FormControl
} from 'react-bootstrap';

class CreateChannel extends Component {

  state = {
    show: false
  };

  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  render() {
    return (
      <React.Fragment>
        <Button
          bsStyle="success"
          onClick={this.handleShow}>
          Create channel
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Créer un salon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form inline>
              <FormControl
                type="text"
                value={ this.state.channelName || "" }
                placeholder="Nom du salon"
                onChange={(e) => {
                    this.setState( { channelName: e.target.value } );
                } }
              />
              <Button onClick={() => {
                this.props.onCreateChannel( this.state.channelName );
                this.handleClose();
              }}>Valider</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreateChannel;
