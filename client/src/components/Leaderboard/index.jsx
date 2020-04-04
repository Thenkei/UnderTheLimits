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
                  primary={(
                    <React.Fragment>
                      <Typography
                        component='span'
                        variant='overline'
                        className={this.props.classes.inline}
                        color='textPrimary'
                      >
                        {item[this.props.labelBy]}
                      </Typography>
                      {` — ${item[this.props.sortBy] || 0} ${this.props.label}`}
                    </React.Fragment>
                )}
                // primary={parseInt(index, 10) + 1}
                  secondary={(
                    <React.Fragment>
                      <Typography
                        component='span'
                        variant='caption'
                        color='textPrimary'
                      >
                        { this.props.other1 && `${item[this.props.other1.prop] || 0} ${this.props.other1.label}` }
                      </Typography>
                      <Typography
                        component='span'
                        variant='caption'
                        color='textPrimary'
                      >
                        { this.props.other2 && `${item[this.props.other2.prop] || 0} ${this.props.other2.label}` }
                      </Typography>
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
  other1: null,
  other2: null,
};

Leaderboard.propTypes = {
  classes: PropTypes.object.isRequired,

  // required
  data: PropTypes.arrayOf(PropTypes.object),
  sortBy: PropTypes.string.isRequired,
  labelBy: PropTypes.string.isRequired,

  title: PropTypes.string,
  label: PropTypes.string,
  other1: PropTypes.object,
  other2: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Leaderboard);
