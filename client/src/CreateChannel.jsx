import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';

class CreateChannel extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
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
          onClick={this.handleShow}
        >
          Create channel
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Créer un salon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                this.props.onCreateChannel(this.state.channelName);
                this.handleClose();
              }}
              inline
            >
              <FormControl
                type="text"
                value={this.state.channelName || ''}
                placeholder="Nom du salon"
                onChange={(e) => {
                  this.setState({ channelName: e.target.value });
                }}
              />
              <Button type="submit">Valider</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

CreateChannel.defaultProps = {
  onCreateChannel: null,
};

CreateChannel.propTypes = {
  onCreateChannel: PropTypes.func,
};


export default CreateChannel;
