import React from 'react';
import PropType from 'prop-types';

import { Avatar, Typography } from '..';

const Message = ({
  username,
  message,
  avatar,
  date,
}) => {
  const formattedDate = new Date(date).toLocaleTimeString('fr-FR');
  return (
    <div>
      <Avatar src={`${window.location.origin}/avatars/${avatar}.png`} />
      <Typography>
        {`${username} - ${decodeURI(message)}`}
      </Typography>
      <Typography>{formattedDate}</Typography>
    </div>
  );
};

Message.propTypes = {
  message: PropType.string.isRequired,
  username: PropType.string.isRequired,
  avatar: PropType.string.isRequired,
  date: PropType.number.isRequired,
};

export default Message;
