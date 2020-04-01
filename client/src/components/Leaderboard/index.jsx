import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  List,
  ListItem,
  ListItemText,
} from '..';

import styles from './styles';

const _sort = (data, sortBy) => {
   if (typeof data === 'object') {
        const sortedKeys = data
            && Object.keys(data).sort((key1, key2) => data[key2][sortBy] - data[key1][sortBy]);
        return (
            sortedKeys
            && sortedKeys.map(key => data[key])
        );
    } if (typeof data === 'array') {
        return (
            data
            && data.sort((item1, item2) => item2[sortBy] - item1[sortBy])
        );
    }
};

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
      this.setState({ sortedData: _sort(data, sortBy) });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.prevData !== nextProps.data) {
        return {
          sortedData: _sort(nextProps.data, nextProps.sortBy),
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
                            className={this.props.listItem}
                        >
                            <ListItemText primary={parseInt(index) + 1} />
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
    sortBy: null,
    labelBy: null,
};

Leaderboard.propTypes = {
  classes: PropTypes.object.isRequired,

  // required
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  sortBy: PropTypes.string.isRequired,
  labelBy: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(Leaderboard);
