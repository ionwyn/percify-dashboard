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

const styles = theme => ({
  root: {
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
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
    value: 50,
    acousticness: 50,
    danceability: 50,
    energy: 50,
    instrumentalness: 50,
    liveness: 50,
    speechiness: 50,
    valence: 50
  };

  handleChange = (event, value, metrics) => {
    this.setState({ [metrics]: value });
  };

  componentDidMount() {
    this.props.getToken();
    this.props.getRecommendation({
      seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
      seed_genres: 'classical,country',
      seed_tracks: '0c6xIDDpzE81m2q797ordA'
    });
    console.log(this.props);
  }

  render() {
    const { classes } = this.props;

    console.log(this.props);
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
              onChange={(event, value) =>
                this.handleChange(event, value, metrics)
              }
            />
          </div>
        ))}
        <div className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {tileData.map(tile => (
              <GridListTile key={tile.img} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))}
          </GridList>
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

function mapStateToProps() {
  return {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
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
