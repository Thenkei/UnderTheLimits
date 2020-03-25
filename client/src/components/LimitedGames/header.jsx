import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Typography,
} from '..';

const Header = ({ isAdmin, gameStatus, headerAction }) => {
  if (gameStatus === 'WAITING_GAME' || gameStatus === 'IDLE') {
    if (isAdmin) {
      return (
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            headerAction();
          }}
        >
          {gameStatus === 'IDLE' ? 'Commencer la partie' : 'Prochain round'}
        </Button>
      );
    }

    return gameStatus === 'IDLE' && <Typography variant='h6'>La partie va bientôt commencer</Typography>;
  }

  return null;
};

Header.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  gameStatus: PropTypes.string.isRequired,
  headerAction: PropTypes.func.isRequired,
};

export default Header;
