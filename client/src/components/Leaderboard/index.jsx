import React from 'react';
import PropTypes from 'prop-types';

import {
    FlatList,
    Image,
    Text,
    View,
  } from '@material-ui/core';

import {
    withStyles,
} from '..';

import styles from './styles';

class UnderTheLimits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedData: [],
            prevData: null
        };
    }

    defaultRenderItem = (classes, item, index) => {
        const sortBy = this.props.sortBy;
        const evenColor = this.props.evenRowColor || evenRowColor;
        const oddColor = this.props.oddRowColor || oddRowColor;
        const rowColor = index % 2 === 0 ? evenColor : oddColor;

        return (
            <React.Fragment>
                <View style={[classes.row, { backgroundColor: rowColor }]}>
                    <View style={classes.left}>
                        <Text
                            style={[
                                classes.rank,
                                this.props.rankStyle,
                                index < 9 ? classes.singleDidget : classes.doubleDidget
                            ]}
                        >
                            {parseInt(index) + 1}
                        </Text>
                        {this.props.icon && (
                            <Image
                                source={{ uri: item[this.props.icon] }}
                                style={[classes.avatar, this.props.avatarStyle]}
                            />
                        )}
                        <Text style={[classes.label, this.props.labelStyle]} numberOfLines={1}>
                            {item[this.props.labelBy]}
                        </Text>
                    </View>
                    <Text style={[classes.score, this.props.scoreStyle]}>
                        {item[sortBy] || 0}
                    </Text>
                </View>
            </React.Fragment>
        );
    }

    renderItem = ({ item, index }) => {
        return this.props.renderItem
            ? this.props.renderItem(item, index)
            : this.defaultRenderItem(item, index);
    };

    componentDidMount() {
        const { data, sortBy, sort } = this.props;
        this.setState({ sortedData: _sort(data, sortBy, sort) });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.prevData !== nextProps.data) {
            return {
                sortedData: _sort(nextProps.data, nextProps.sortBy, nextProps.sort),
                prevData: nextProps.data
            };
        } else {
            return {};
        }
    }

    render() {
        const { sortedData } = this.state;

        return (
            <FlatList
                data={sortedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={data => this.renderItem(data)}
            />
        );
    }
}

Leaderboard.defaultProps = {
    players: [],
    channel: null,
};

Leaderboard.propTypes = {
    classes: PropTypes.object.isRequired,

    //required
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    sortBy: PropTypes.string.isRequired,
    labelBy: PropTypes.string.isRequired,

    //optional
    sort: PropTypes.func,
    icon: PropTypes.string,
    renderItem: PropTypes.func,
    containerStyle: PropTypes.object,
    scoreStyle: PropTypes.object,
    rankStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    avatarStyle: PropTypes.object,
    oddRowColor: PropTypes.string,
    evenRowColor: PropTypes.string
};

_sort = (data, sortBy, sort) => {
    if (sort) {
        return sort(data);
    } else if (typeof data === "object") {
        let sortedKeys =
            data &&
            Object.keys(data).sort((key1, key2) => {
                return data[key2][sortBy] - data[key1][sortBy];
            });
        return (
            sortedKeys &&
            sortedKeys.map(key => {
                return data[key];
            })
        );
    } else if (typeof data === "array") {
        return (
            data &&
            data.sort((item1, item2) => {
                return item2[sortBy] - item1[sortBy];
            })
        );
    }
};

export default withStyles(styles, { withTheme: true })(Leaderboard);
