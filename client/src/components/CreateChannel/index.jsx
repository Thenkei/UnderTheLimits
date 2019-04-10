import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '..';

const CreateChannel = ({ onCreateChannel }) => {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [minPlayersCount, setMinPlayersCount] = useState(2);
  const [maxPlayersCount, setMaxPlayersCount] = useState(3);
  const [maxPoints, setMaxPoints] = useState(5);

  const range = (start, end) => new Array(end - start).fill().map((d, i) => i + start);

  const minPlayersChoices = range(2, maxPlayersCount);
  const maxPlayersChoices = range(minPlayersCount + 1, 9);

  return (
    <React.Fragment>
      <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
        Créer une partie
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Paramètres de la partie
        </DialogTitle>
        <DialogContent>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            onSubmit={(e) => {
              e.preventDefault();
              const channel = {
                opts: {
                  channelName,
                  minPlayersCount,
                  maxPlayersCount,
                  maxPoints,
                },
              };
              onCreateChannel({ channel });
              open(false);
            }}
          >
            <Input
              autoComplete
              type='text'
              value={channelName}
              placeholder='Nom du salon'
              onChange={({ target }) => {
                setChannelName(target.value);
              }}
            />

            <FormControl>
              <InputLabel>Nombre minimum de joueurs :</InputLabel>
              <Select
                value={minPlayersCount}
                onChange={({ target }) => setMinPlayersCount(Number(target.value))}
              >
                {minPlayersChoices.map(i => (
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Nombre maximum de joueurs :</InputLabel>
              <Select
                value={maxPlayersCount}
                onChange={({ target }) => setMaxPlayersCount(Number(target.value))}
              >
                {maxPlayersChoices.map(i => (
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Nombre maximum de points :</InputLabel>
              <Select
                value={maxPoints}
                onChange={({ target }) => setMaxPoints(Number(target.value))}
              >
                {range(1, 10).map(i => (
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </Select>
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
  onCreateChannel: PropTypes.func,
};

export default CreateChannel;
