import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Typography,
  Avatar,
} from '..';

import styles from './styles';

const sort = (data, sortBy) => data && data.sort((item1, item2) => item2[sortBy] - item1[sortBy]);

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedData: [],
      prevData: null,
    };
  }

  componentDidMount() {
    const { data, sortBy } = this.props;
    this.setState({ sortedData: sort(data, sortBy) });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.prevData !== nextProps.data) {
      return {
        sortedData: sort(nextProps.data, nextProps.sortBy),
        prevData: nextProps.data,
      };
    }
    return {};
  }

  render() {
    const { sortedData } = this.state;
    if (!sortedData) return null;
    return (
      <React.Fragment>
        <div className={this.props.classes.listHeader}>
          <Typography align='center' variant='h3'>{this.props.title}</Typography>
        </div>
        <List component='nav' className={this.props.classes.list}>
          {sortedData.map(item => (
            <React.Fragment key={item.id}>
              <ListItem
                alignItems='flex-start'
                className={this.props.classes.listItem}
              >
                <ListItemAvatar>
                  <Avatar
                    src={`${window.location.origin}/avatars/${item[this.props.labelBy]}.png`}
                    className={this.props.classes.playerAvatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  disableTypography={true}
                  primary={(
                    <React.Fragment>
                      <Typography
                        variant='overline'
                        color='textPrimary'
                      >
                        {item[this.props.labelBy]}
                      </Typography>
                      <Typography
                        component='span'
                      >
                        {` - ${item[this.props.sortBy] || 0} ${this.props.label}`}
                      </Typography>
                    </React.Fragment>
                  )}
                  secondary={(
                    <React.Fragment>
                      {this.props.extraInfos.map(extraInfo => (
                        <Typography
                          key={extraInfo.prop}
                          variant='caption'
                          color='textPrimary'
                          component='p'
                        >
                          {`${item[extraInfo.prop] || 0} ${extraInfo.label}` }
                        </Typography>
                      ))}
                    </React.Fragment>
                  )}
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </React.Fragment>
          ))}
        </List>
      </React.Fragment>
    );
  }
}

Leaderboard.defaultProps = {
  data: [],

  title: 'Classement',
  label: 'pts',
  extraInfos: [],
};

Leaderboard.propTypes = {
  classes: PropTypes.object.isRequired,

  // required
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortBy: PropTypes.string.isRequired,
  labelBy: PropTypes.string.isRequired,

  title: PropTypes.string,
  label: PropTypes.string,
  extraInfos: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    prop: PropTypes.string,
  })),
};

export default withStyles(styles, { withTheme: true })(Leaderboard);
