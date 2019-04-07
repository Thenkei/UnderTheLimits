import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import {
  Input,
  Button,
  Avatar,
  Typography,
} from '..';

import './style.scss';

const Chat = ({ sendMessage, messages, username }) => {
  const [message, setMessage] = useState('');
  return (
    <div className='Chat'>
      <div className='Chat-sendedMessages'>
        <div className='Chat-topBar'> Toi aussi clash tes potos </div>
        {messages.reverse().map(m => (
          <div key={m.message}>
            <Avatar src={`${window.location.origin}/avatars/${m.player}.png`} />
            <Typography>
              {`${m.player === username ? 'you' : m.player} - ${decodeURI(m.message)}`}
            </Typography>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (message && message.length > 0) {
            setMessage('');
            sendMessage(message);
          }
        }}
      >
        <Input
          className='Chat-sendMessageInput'
          type='message'
          placeholder='Votre message ...'
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          className='Chat-sendMessageButton'
          type='submit'
        >
          Envoyer
        </Button>
      </form>
    </div>
  );
};

Chat.defaultProps = {
  messages: [],
  username: '',
};

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  username: PropTypes.string,
  messages: PropTypes.instanceOf(List),
};

export default Chat;
