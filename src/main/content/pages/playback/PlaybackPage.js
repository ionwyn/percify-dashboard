import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import { withRouter } from 'react-router-dom';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { Card, CardContent, Grow } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = theme => ({
  root: {
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover'
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
  constructor(props) {
    super(props);
    // set the initial state
    this.state = {
      token:
        'BQCeHVn5VHNDsvpJDAKyWZt-sE7ZAtAlc9_bLPLyoJA4GQFndIjzIgZntj6EEGe-Ln06A1LFqYXrt8Kt1UCw-dXjXNjkkk4B_8-FnIAOtVtx-N30XWin06mgcbO3QIPf1hKmW4_pezlsZAJ9M8zLGoJ70GIpHLOjQyR7AZ5puErXkhQJ',
      deviceId: '',
      loggedIn: false,
      error: '',
      trackName: 'Track Name',
      artistName: 'Artist Name',
      playing: false,
      position: 0,
      duration: 1
    };
    // this will later be set by setInterval
    this.playerCheckInterval = null;
    this.handleLogin();
  }
  handleLogin() {
    console.log('trying');
    if (this.state.token !== '') {
      // change the loggedIn variable, then start checking for the window.Spotify variable
      this.setState({ loggedIn: true });
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  // when we receive a new update from the player
  onStateChanged(state) {
    // only update if we got a real state
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration
      } = state.track_window;
      console.log(currentTrack);
      const trackName = currentTrack.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(', ');
      const playing = !state.paused;
      const trackImg = currentTrack.album.images[0].url || null;
      console.log(trackImg);
      this.setState({
        position,
        duration,
        trackName,
        artistName,
        playing,
        trackImg
      });
    } else {
      // state was null, user might have swapped to another device
      this.setState({
        error:
          'Playback has stopped because you have switched to another device'
      });
    }
  }

  createEventHandlers() {
    // problem setting up the player
    this.player.on('initialization_error', e => {
      console.error(e);
    });

    // currently only premium accounts can use the API
    this.player.on('account_error', e => {
      console.error(e);
    });
    // loading/playing the track failed for some reason
    this.player.on('playback_error', e => {
      console.error(e);
    });

    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state));

    // Ready
    this.player.on('ready', async data => {
      let { device_id } = data;
      // set the deviceId variable, then let's try
      // to swap music playback to *our* player!
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    });
  }

  checkForPlayer() {
    const { token } = this.state;

    console.log(token);

    // if the Spotify SDK has loaded
    if (window.Spotify !== null) {
      // cancel the interval
      clearInterval(this.playerCheckInterval);
      // create a new player
      this.player = new window.Spotify.Player({
        name: 'Intersect Spotify Player',
        getOAuthToken: cb => {
          cb(token);
        }
      });

      console.log('THIS IS PLAYER');
      console.log(this.player);
      // set up the player's event handlers
      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
    }
  }

  onPrevClick() {
    this.player.previousTrack();
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }

  transferPlaybackHere() {
    const { deviceId, token } = this.state;
    // https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        // true: start playing music if it was paused on the other device
        // false: paused if paused on other device, start playing music otherwise
        play: true
      })
    });
  }

  render() {
    const { classes, theme } = this.props;
    const { trackName, artistName, trackImg } = this.state;

    console.log('huehuehue');
    console.log(trackImg);

    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-col flex-auto flex-no-shrink items-center justify-center p-32'
        )}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <Grow in={true}>
            <Card className={classes.card}>
              <CardContent className="flex flex-col items-center justify-center text-center p-48">
                <img src={trackImg} alt="logo" />
                <CardContent className={classes.content}>
                  <Typography variant="headline">{trackName}</Typography>
                  <Typography variant="subheading" color="textSecondary">
                    {artistName}
                  </Typography>
                </CardContent>
                <div className={classes.controls}>
                  <IconButton
                    aria-label="Previous"
                    onClick={() => this.onPrevClick()}
                  >
                    {theme.direction === 'rtl' ? (
                      <SkipNextIcon />
                    ) : (
                      <SkipPreviousIcon />
                    )}
                  </IconButton>
                  <IconButton
                    aria-label="Play/pause"
                    onClick={() => this.onPlayClick()}
                  >
                    <PlayArrowIcon className={classes.playIcon} />
                  </IconButton>
                  <IconButton
                    aria-label="Next"
                    onClick={() => this.onNextClick()}
                  >
                    {theme.direction === 'rtl' ? (
                      <SkipPreviousIcon />
                    ) : (
                      <SkipNextIcon />
                    )}
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grow>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
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
