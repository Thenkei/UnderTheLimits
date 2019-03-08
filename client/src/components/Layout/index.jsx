import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';


const MainLayout = ({ children, error, success }) => (
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

MainLayout.defaultProps = {
  error: null,
  success: null,
};

MainLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,

  error: PropTypes.shape({}),
  success: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const {
    error,
    success,
  } = state.app;

  return {
    error,
    success,
  };
};

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
