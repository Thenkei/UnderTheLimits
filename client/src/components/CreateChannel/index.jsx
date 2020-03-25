import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Zoom,
  Switch,
  withStyles,
} from '..';

import styles from './styles';

const CreateChannel = ({ classes, onCreateChannel, displayError }) => {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [gameType, setGameType] = useState('utlgame');
  const [minPlayersCount, setMinPlayersCount] = useState(2);
  const [maxPlayersCount, setMaxPlayersCount] = useState(7);
  const [maxPoints, setMaxPoints] = useState(5);
  const [isPrivate, setPrivate] = useState(false);
  const range = (start, end) => new Array(end - start).fill().map((d, i) => i + start);
  const games = [{
    value: 'utlgame',
    text: 'UTL Game (Simple)',
  }, {
    value: 'utlplus',
    text: 'UTL Plus (Difficile)',
  }, {
    value: 'ninety-nine',
    text: 'Ninety-nine (Get Drunk)',
  }];

  const gamesChoices = {
    minPlayersChoices: (gameType === 'utlgame' ? range(2, maxPlayersCount) : range(4, maxPlayersCount)),
    maxPlayersChoices: (gameType === 'utlgame' ? range(minPlayersCount + 1, 9) : range(minPlayersCount + 1, 12)),
    maxPointsChoices: (gameType === 'utlgame' ? range(1, 10) : range(6, 20)),
  };

  return (
    <React.Fragment>
      <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
        Créer une partie
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='form-dialog-title'
        classes={{ paper: classes.createChanelDialogBckgrd }}
        TransitionComponent={Zoom}
      >
        <DialogTitle
          id='form-dialog-title'
          className={classes.createChanelDialogTitle}
        >
          Paramètres de la partie
        </DialogTitle>
        <DialogContent>
          <form
            className={classes.createChannelForm}
            onSubmit={(e) => {
              e.preventDefault();
              const roomNameRegex = /^([a-zA-Z]|[à-ú]|[À-Ú]|-|_| )+$/;
              if (!channelName || !roomNameRegex.exec(channelName)) {
                displayError({
                  message: `Le nom ${channelName} n'est pas valide !`,
                });
              } else {
                const channel = {
                  opts: {
                    gameType,
                    channelName,
                    minPlayersCount,
                    maxPlayersCount,
                    maxPoints,
                    isPrivate,
                  },
                };
                onCreateChannel({ channel });
                setOpen(false);
              }
            }}
          >
            <Input
              required
              autoFocus
              autoComplete='true'
              type='text'
              value={channelName}
              placeholder='Nom du salon'
              onChange={({ target }) => {
                setChannelName(target.value);
              }}
              className={classes.createChannelFormControl}
            />

            <FormControl className={classes.createChannelFormControl}>
              <InputLabel>Selection du jeu :</InputLabel>
              <Select
                value={gameType}
                onChange={({ target }) => {
                  setGameType(target.value);
                  setMinPlayersCount(4);
                  setMaxPlayersCount(7);
                  setMaxPoints(6);
                }
              }
              >
                {games.map(i => (
                  <MenuItem key={i.value} value={i.value}>{i.text}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.createChannelFormControl}>
              <InputLabel>Nombre minimum de joueurs :</InputLabel>
              <Select
                value={minPlayersCount}
                onChange={({ target }) => setMinPlayersCount(Number(target.value))}
              >
                {gamesChoices.minPlayersChoices.map(i => (
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.createChannelFormControl}>
              <InputLabel>Nombre maximum de joueurs :</InputLabel>
              <Select
                value={maxPlayersCount}
                onChange={({ target }) => setMaxPlayersCount(Number(target.value))}
              >
                {gamesChoices.maxPlayersChoices.map(i => (
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.createChannelFormControl}>
              <InputLabel>Nombre maximum de points :</InputLabel>
              <Select
                value={maxPoints}
                onChange={({ target }) => setMaxPoints(Number(target.value))}
              >
                {gamesChoices.maxPointsChoices.map(i => (
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.createChannelFormControl}>
              <FormControlLabel
                control={(
                  <Switch
                    onChange={({ target }) => setPrivate(target.checked)}
                    value={isPrivate}
                  />
                )}
                label='Partie privée ?'
              />
            </FormControl>
            <Button variant='contained' color='secondary' type='submit'>
              Valider
            </Button>

          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

CreateChannel.defaultProps = {
  onCreateChannel: null,
};

CreateChannel.propTypes = {
  classes: PropTypes.object.isRequired,

  onCreateChannel: PropTypes.func,
  displayError: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(CreateChannel);
