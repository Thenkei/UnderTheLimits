import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Typography,
  withStyles,
} from '../../components';


import { wssUpdateAdmin } from '../../reducers/admin';

import QueryParser from '../../utils/queryParser';

import styles from './styles';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.params = QueryParser.parse(this.props.location.search);
  }

  componentDidMount() {
    this.props.updateAdmin();
  }

  render() {
    const { classes } = this.props;

    if (!['nimda'].contains(this.props.player.name)) {
      return <Redirect to='/' />;
    }

    if (!this.props.admin) {
      return <Typography>Loading ...</Typography>;
    }

    return (
      <div className={classes.listHeader}>
        <Typography variant='h3'>Adminitration</Typography>
        <Typography variant='body1'>{this.props.admin.stats}</Typography>
      </div>
    );
  }
}

Admin.defaultProps = {
  admin: null,
  player: null,
};

Admin.propTypes = {
  classes: PropTypes.object.isRequired,

  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,

  updateAdmin: PropTypes.func.isRequired,


  admin: PropTypes.shape({
    stats: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  player: PropTypes.shape({
    isGameMaster: PropTypes.bool,
    name: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  lobby: state.lobby,
  player: state.player,
  currentChannel: state.channel,
});

const mapDispatchToProps = dispatch => ({
  updateAdmin: () => {
    dispatch(wssUpdateAdmin());
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles, { withTheme: true })(Admin)),
);
