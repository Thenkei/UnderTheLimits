import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';


const CreateChannel = ({ onCreateChannel }) => {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [minPlayersCount, setMinPlayersCount] = useState(2);
  const [maxPlayersCount, setMaxPlayersCount] = useState(8);
  const [maxPoints, setMaxPoints] = useState(5);

  const range = (start, end) => new Array(end - start).fill().map((d, i) => i + start);

  const minPlayersChoices = range(2, maxPlayersCount);
  const maxPlayersChoices = range(minPlayersCount + 1, 8);

  return (
    <React.Fragment>
      <Button
        variant='success'
        onClick={() => setShow(true)}
      >
        Créer une partie
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Créer un salon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const channel = {
                name: channelName,
                opts: {
                  minPlayersCount,
                  maxPlayersCount,
                  maxPoints,
                },
              };
              onCreateChannel({ channel });
              setShow(false);
            }}
            inline
          >
            <Form.Control
              type='text'
              value={channelName}
              placeholder='Nom du salon'
              onChange={({ target }) => {
                setChannelName(target.value);
              }}
            />
            <Form.Group controlId='createChannel.minplayerscount'>
              <Form.Label>Nombre minimum de joueurs :</Form.Label>
              <Form.Control
                as='select'
                value={minPlayersCount}
                onChange={({ target }) => setMinPlayersCount(Number(target.value))}
              >
                {
                  minPlayersChoices.map(i => <option key={i}>{i}</option>)
                }
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='createChannel.maxplayerscount'>
              <Form.Label>Nombre maximum de joueurs :</Form.Label>
              <Form.Control
                as='select'
                value={maxPlayersCount}
                onChange={({ target }) => setMaxPlayersCount(Number(target.value))}
              >
                {
                  maxPlayersChoices.map(i => <option key={i}>{i}</option>)
                }
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='createChannel.maxpoints'>
              <Form.Label>Nombre maximum de points :</Form.Label>
              <Form.Control
                as='select'
                value={maxPoints}
                onChange={({ target }) => setMaxPoints(Number(target.value))}
              >
                {
                  range(1, 10).map(i => <option key={i}>{i}</option>)
                }
              </Form.Control>
            </Form.Group>
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
