import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import {
  Input,
  Button,
} from '..';

import Message from './Message';

import './style.scss';

const Chat = ({ sendMessage, messages, username }) => {
  const [message, setMessage] = useState('');
  return (
    <div className='Chat'>
      <div className='Chat-sendedMessages'>
        <div className='Chat-topBar'> Toi aussi clash tes potos </div>
        {messages.reverse().map(m => (
          <Message
            key={m.date}
            username={`${m.player === username ? 'you' : m.player}`}
            avatar={m.player}
            message={m.message}
            date={m.date}
          />
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
