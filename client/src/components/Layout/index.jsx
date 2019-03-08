import React from 'react';
import PropTypes from 'prop-types';


const MainLayout = ({ children }) => (
  <div className='App'>
    {/* {this.state.error && <Alert bsStyle='danger'>{this.state.error}</Alert>}
    {this.state.success && <Alert bsStyle='success'>{this.state.success}</Alert>} */}
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


MainLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};


export default MainLayout;
