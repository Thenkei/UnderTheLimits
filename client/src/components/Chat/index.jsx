import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import {
  Input,
  Button,
  withStyles,
  Typography,
} from '..';

import Message from './Message';

import styles from './styles';

const Chat = ({
  classes,
  sendMessage,
  messages,
  username,
}) => {
  const [message, setMessage] = useState('');
  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Typography variant='overline' color='textSecondary'>
          Toi aussi clash tes potos
        </Typography>
      </div>
      <div className={classes.messagesFlow}>
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
      <div className={classes.sendMessagesForm}>
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
            className={classes.sendMessageInput}
            type='message'
            placeholder='Votre message ...'
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.sendMessageButton}
            type='submit'
          >
            Envoyer
          </Button>
        </form>
      </div>
    </div>
  );
};

Chat.defaultProps = {
  messages: [],
  username: '',
};

Chat.propTypes = {
  classes: PropTypes.object.isRequired,

  sendMessage: PropTypes.func.isRequired,
  username: PropTypes.string,
  messages: PropTypes.instanceOf(List),
};

export default withStyles(styles, { withTheme: true })(Chat);
