import React from 'react';
import PropType from 'prop-types';

import { withStyles, Avatar, Typography } from '..';

import styles from './styles';

const Message = ({
  classes,
  username,
  message,
  avatar,
  date,
}) => {
  const formattedDate = new Date(date).toLocaleTimeString('fr-FR');
  return (
    <div className={classes.wrapper}>
      <Avatar className={classes.avatar} src={`${window.location.origin}/avatars/${avatar}.png`} />
      <div className={classes.sendedMessage}> 
        <Typography variant='h6' className={classes.playerName} align='left'>{username}</Typography>
        <Typography className={classes.text}>{decodeURI(message)}</Typography>
        <Typography variant='caption' className={classes.metaDate} align='left'>{formattedDate}</Typography>
      </div>
    </div>
  );
};

Message.propTypes = {
  classes: PropType.string.isRequired,
  message: PropType.string.isRequired,
  username: PropType.string.isRequired,
  avatar: PropType.string.isRequired,
  date: PropType.number.isRequired,
};

export default withStyles(styles, { withTheme: true })(Message);
