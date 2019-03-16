import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Chat = ({ sendMessage, messages }) => {
  const [message, setMessage] = useState('');
  const formattedMessages = messages.map(m => decodeURI(m)).reverse().join('\n');
  return (
    <Form onSubmit={e => e.preventDefault()} autoComplete='off'>
      <Form.Group controlId='chatForm.textarea'>
        <Form.Label>
          Messages:
        </Form.Label>
        <Form.Control
          as='textarea'
          rows='3'
          value={formattedMessages}
          disabled
        />
      </Form.Group>
      <Form.Group controlId='chatForm.message'>
        <Form.Control
          type='message'
          placeholder='Votre message ...'
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <Button
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

  messages: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Chat;
