import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { Card, Grow } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SingleLineItemList from 'main/content/components/item-list/SingleLineItemList';

const styles = theme => ({
  root: {
    width: 300
  },
  card: {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
    height: '45vw'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  content: {
    flex: '1 0 auto'
  },
  gridList: {
    width: 500,
    height: 450
  },
  subheader: {
    width: '100%'
  }
});
// <div className="flex flex-row items-center justify-center w-full">
//   <Grow in={true}>
//     <Card className={classes.card}>
//       <SpotifyPlayback />
//     </Card>
//   </Grow>
// </div>

class Discover extends Component {
  state = {
    value: 0.5,
    acousticness: 0.5,
    danceability: 0.5,
    energy: 0.5,
    instrumentalness: 0.5,
    liveness: 0.5,
    speechiness: 0.5,
    valence: 0.5
  };

  handleChange = (event, value, metrics) => {
    this.setState({ [metrics]: value });
  };

  getNewRecommendation = (event, value, metrics) => {
    this.props.getRecommendation({
      seed_genres: 'jazz',
      [metrics]: value
    });
  };

  componentDidMount() {
    this.props.getToken();
    console.log(this.props);
  }

  render() {
    const { classes, recommendations } = this.props;

    console.log(recommendations);
    console.log(this.state);

    const metrics = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence'
    ];

    // ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself in constructor.
    // Either write a constructor that binds your function to 'this', or use arrow function () =>
    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-col flex-auto flex-no-shrink items-center justify-center p-32'
        )}
      >
        {metrics.map(metrics => (
          <div key={metrics} className={classes.root}>
            <Typography id="label">{metrics}</Typography>
            <Slider
              id="puta"
              value={this.state[metrics]}
              aria-labelledby="label"
              max={1}
              onChange={(event, value) =>
                this.handleChange(event, value, metrics)
              }
              onDragEnd={(event, value) =>
                this.getNewRecommendation(event, value, metrics)
              }
            />
          </div>
        ))}
        <div className={classes.root}>
          <Card>
            {recommendations.state !== undefined ? (
              <SingleLineItemList userTop={recommendations.state} />
            ) : null}
          </Card>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRecommendation: Actions.getRecommendation,
      getToken: Actions.getToken
    },
    dispatch
  );
}

function mapStateToProps({ userRecommend }) {
  return {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    recommendations: userRecommend.userRecommendations
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Discover)
  )
);
