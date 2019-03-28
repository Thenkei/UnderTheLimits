import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './style.scss';

const Chat = ({ sendMessage, messages }) => {
  const [message, setMessage] = useState('');
  const formattedMessages = messages.map(m => `${m.player} - ${decodeURI(m.message)}`).reverse().join('\n');
  return (
    <Form
      className='Chat'
      onSubmit={e => e.preventDefault()}
      autoComplete='off'
    >
      <div className='Chat-sendedMessages'>
        <div className='Chat-topBar'> Toi aussi clash tes potos </div>
        <p className='Chat-messagesFlow'>
          { formattedMessages }
        </p>
      </div>
      <Form.Group controlId='chatForm.message' className='Chat-sendMessage'>
        <Form.Control
          className='Chat-sendMessageInput'
          type='message'
          placeholder='Votre message ...'
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <Button
        className='Chat-sendMessageButton'
          type='submit'
          onClick={() => {
            if (message && message.length > 0) {
              setMessage('');
              sendMessage(message);
            }
          }}
        >
          Envoyer
        </Button>
      </Form.Group>
    </Form>
  );
};

Chat.defaultProps = {
  messages: [],
};

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,

  messages: PropTypes.instanceOf(List),
};

export default Chat;
