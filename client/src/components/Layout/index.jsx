import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert } from 'react-bootstrap';
import Sound from 'react-sound';

import { wssInit, stopSound } from '../../reducers/app';

class MainLayout extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      children,
      error,
      success,
      isPlaySound,
      isSoundMuted,
      appStopSound,
    } = this.props;

    return (
      <div className='App'>
        {error && <Alert variant='danger'>{error}</Alert>}
        {success && <Alert variant='success'>{success}</Alert>}
        <Sound
          url='/public/ding.mp3'
          playStatus={isPlaySound ? Sound.status.PLAYING : Sound.status.STOPPED}
          volume={isSoundMuted ? 0 : 100}
          onFinishedPlaying={() => appStopSound()}
        />
        <header className='App-header'>
          <img
            src='/public/images/UTL_Logo.png'
            alt='under-the-limits'
            className='App-logo'
          />
        </header>
        { children }
      </div>
    );
  }
}

MainLayout.defaultProps = {
  error: null,
  success: null,
};

MainLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,

  error: PropTypes.string,
  success: PropTypes.string,
  isPlaySound: PropTypes.bool.isRequired,
  isSoundMuted: PropTypes.bool.isRequired,

  init: PropTypes.func.isRequired,
  appStopSound: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    errorMessage,
    success,
    isPlaySound,
    isSoundMuted,
  } = state.app;
  return {
    error: errorMessage,
    success,
    isPlaySound,
    isSoundMuted,
  };
};

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(wssInit());
  },
  appStopSound: () => dispatch(stopSound()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
