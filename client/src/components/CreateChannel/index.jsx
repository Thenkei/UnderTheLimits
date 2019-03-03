import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';


const CreateChannel = ({ onCreateChannel }) => {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');

  return (
    <React.Fragment>
      <Button
        bsStyle='success'
        onClick={() => setShow(true)}
      >
        Create channel
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Créer un salon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onCreateChannel(channelName);
              setShow(false);
            }}
            inline
          >
            <FormControl
              type='text'
              value={channelName}
              placeholder='Nom du salon'
              onChange={({ target }) => {
                setChannelName(target.value);
              }}
            />
            <Button type='submit'>Valider</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

CreateChannel.defaultProps = {
  onCreateChannel: null,
};

CreateChannel.propTypes = {
  onCreateChannel: PropTypes.func,
};

export default CreateChannel;
