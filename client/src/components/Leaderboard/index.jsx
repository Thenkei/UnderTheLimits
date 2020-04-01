import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  List,
  ListItem,
  ListItemText,
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
        <List component='nav' className={this.props.classes.list}>
          {(sortedData.map((item, index) => (
            <ListItem
              key={item.id}
              className={this.props.classes}
            >
              <ListItemText primary={parseInt(index, 10) + 1} />
              <ListItemText primary={item[this.props.labelBy]} />
              <ListItemText primary={item[this.props.sortBy] || 0} />
            </ListItem>
          )))
                    }
        </List>
      </React.Fragment>
    );
  }
}

Leaderboard.defaultProps = {
  data: [],
};

Leaderboard.propTypes = {
  classes: PropTypes.object.isRequired,

  // required
  data: PropTypes.arrayOf(PropTypes.object),
  sortBy: PropTypes.string.isRequired,
  labelBy: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(Leaderboard);
