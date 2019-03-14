import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

import { wssInit } from '../../reducers/app';

const MainLayout = ({
  children,
  error,
  success,
  init,
}) => {
  useEffect(
    () => {
      init();
    },
  );
  return (
    <div className='App'>
      {error && <Alert bsStyle='danger'>{error}</Alert>}
      {success && <Alert bsStyle='success'>{success}</Alert>}
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
};

MainLayout.defaultProps = {
  error: null,
  success: null,
};

MainLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,

  error: PropTypes.shape({}),
  success: PropTypes.shape({}),
  init: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    errorMessage,
    success,
  } = state.app;
  return {
    error: errorMessage,
    success,
  };
};

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(wssInit());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
