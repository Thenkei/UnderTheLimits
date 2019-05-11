import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import {
  withStyles,
  Typography,
  InputAdornment,
  IconButton,
  Input,
  ListItem,
  Popover,
  SendIcon,
} from '..';

import Message from './Message';

import styles from './styles';

const Chat = ({
  classes,
  sendMessage,
  messages,
  username,
  players,
}) => {
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const submit = (e) => {
    e.preventDefault();
    if (message && message.length > 0) {
      setMessage('');
      sendMessage(message);
    }
  };

  const playersWithoutSelf = players.filter(p => p.name !== username);
  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Typography className={classes.topBarTitle} variant='overline'>
          Toi aussi clash tes potos
        </Typography>
      </div>
      <div className={classes.messagesFlow}>
        {messages.reverse().map(m => (
          <Message
            key={m.date}
            username={`${m.player === username ? 'Vous' : m.player}`}
            avatar={m.player}
            message={m.message}
            isPlayer={m.isPlayer}
            date={m.date}
            isPrivate={m.isPrivate}
            isSystem={m.isSystem}
          />
        ))}
      </div>
      <form
        className={classes.sendMessagesForm}
        onSubmit={submit}
      >
        <Popover
          className={classes.playersPopover}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={() => setAnchorEl(null)}
        >
          <Typography>
            Envoyer un message privé à :
          </Typography>
          {playersWithoutSelf.length && playersWithoutSelf.map(p => (
            <ListItem
              key={p.name}
              onClick={() => {
                setAnchorEl(null);
                setMessage(`/mp ${p.name}`);
              }}
            >
              {p.name}
            </ListItem>
          ))}
        </Popover>
        <Input
          className={classes.sendMessageInput}
          classes={{ inputType: classes.sendMessageInputType }}
          fullWidth
          multiline
          rows='2'
          type='message'
          placeholder='Votre message ...'
          value={message}
          onChange={({ target, currentTarget }) => {
            if (message.startsWith('/mp') && message.length < 4 && playersWithoutSelf.length >= 1) {
              setAnchorEl(currentTarget);
            }
            setMessage(target.value);
          }}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              submit(ev);
            }
          }}
          endAdornment={(
            <InputAdornment position='end'>
              <IconButton
                className={classes.sendMessageButton}
                type='submit'
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          )}
        />

      </form>
    </div>
  );
};

Chat.defaultProps = {
  messages: List(),
  username: '',
  players: [],
};

Chat.propTypes = {
  classes: PropTypes.object.isRequired,

  sendMessage: PropTypes.func.isRequired,
  username: PropTypes.string,
  messages: PropTypes.instanceOf(List),
  players: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(Chat);
