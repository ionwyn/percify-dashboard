import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import { withRouter } from 'react-router-dom';
import { Card, Grow } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SpotifyPlayback from 'main/content/components/spotify-playback/SpotifyPlayback';

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
  }
});

class PlaybackPage extends Component {
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

  render() {
    const { classes } = this.props;

    // ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself in constructor.
    // Either write a constructor that binds your function to 'this', or use arrow function () =>
    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-col flex-auto flex-no-shrink items-center justify-center p-32'
        )}
      >
        <div className="flex flex-row items-center justify-center w-full">
          <Grow in={true}>
            <Card className={classes.card}>
              <SpotifyPlayback />
            </Card>
          </Grow>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps)(PlaybackPage))
);
