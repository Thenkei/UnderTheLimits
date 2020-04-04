import React from 'react';
import PropType from 'prop-types';
import classNames from 'classnames';

import { withStyles, Avatar, Typography } from '..';

import styles from './styles';

const Message = ({
  classes,
  username,
  message,
  avatar,
  date,
  isPlayer,
  isPrivate,
  isSystem,
}) => {
  const formattedDate = new Date(date).toLocaleTimeString('fr-FR');
  if (isSystem) {
    return (
      <div
        className={classNames(classes.fullMessage, classes.fullMessageSystem)}
      >
        <div className={classes.sendedMessage}>
          <Typography
            className={classNames(classes.text, classes.isInfo)}
            align='left'
          >
            {decodeURI(message)}
          </Typography>
          <Typography className={classNames(classes.metaDate, classes.metaDateSystem)} align='left' variant='caption'>{formattedDate}</Typography>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.fullMessage}>
      {avatar && <Avatar className={classes.avatar} src={`${window.location.origin}/avatars/${avatar}.png`} />}
      {isPrivate && <Avatar className={classes.avatar} src={`${window.location.origin}/avatars/${isPrivate.name}.png`} />}
      <div className={classes.sendedMessage}>
        <Typography className={classes.playerName} align='left' variant='h6'>
          {username}
          { isPrivate && ` - ${isPrivate.name}`}
        </Typography>
        <Typography
          className={classNames(classes.text, {
            [classes.isPlayer]: isPlayer,
            [classes.isPrivate]: isPrivate,
          })}
          align='left'
        >
          {decodeURI(message)}
        </Typography>
        <Typography className={classes.metaDate} align='left' variant='caption'>{formattedDate}</Typography>
      </div>
    </div>
  );
};

Message.defaultProps = {
  isPlayer: false,
  isPrivate: false,
  isSystem: false,
  avatar: null,
};

Message.propTypes = {
  classes: PropType.object.isRequired,

  message: PropType.string.isRequired,
  username: PropType.string.isRequired,
  avatar: PropType.string,
  date: PropType.number.isRequired,
  isPlayer: PropType.bool,
  isPrivate: PropType.bool,
  isSystem: PropType.bool,
};

export default withStyles(styles, { withTheme: true })(Message);
