import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { CardContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import classNames from 'classnames';

const styles = theme => ({
  root: {},
  card: {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
    height: '45vw',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  content: {
    flex: '1 0 auto',
  },
});

class MainFooter extends Component {
  constructor(props) {
    super(props);

    // set the initial state
    this.state = {
      token: '',
      deviceId: '',
      loggedIn: false,
      error: '',
      trackName: '',
      artistName: '',
      playing: false,
      position: 0,
      duration: 1,
      trackImg: '',
    };

    // this will later be set by setInterval
    this.playerCheckInterval = null;
  }

  componentDidMount() {
    this.handleLogin();
  }
  handleLogin() {
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
        duration,
      } = state.track_window;

      const trackName = currentTrack.name;
      const artistName = currentTrack.artists
        .map(({ name }) => name)
        .join(', ');
      const playing = !state.paused;
      const trackImg = currentTrack.album.images[0].url || null;

      this.setState({
        position,
        duration,
        trackName,
        artistName,
        playing,
        trackImg,
      });
    } else {
      // state was null, user might have swapped to another device
      this.setState({
        error:
          'Playback has stopped because you have switched to another device',
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

    // if the Spotify SDK has loaded
    if (window.Spotify !== null) {
      // cancel the interval
      clearInterval(this.playerCheckInterval);

      // create a new player
      this.player = new window.Spotify.Player({
        name: 'Intersect Spotify Player',
        getOAuthToken: cb => {
          cb(token);
        },
      });

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
    if (this.state.token === '') {
      const aToken = JSON.parse(sessionStorage.getItem('userToken'))
        .access_token;
      this.setState({ token: aToken }, () => {
        this.handleLogin();
      });
    } else {
      this.player.togglePlay();
    }
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        // true: start playing music if it was paused on the other device
        // false: paused if paused on other device, start playing music otherwise
        play: true,
      }),
    });
  }

  render() {
    const { classes } = this.props;
    const { trackName, artistName, trackImg, playing } = this.state;

    return (
      <div
        className={classNames(classes.root, 'flex flex-1 items-center px-24')}
      >
        <img width={75} height={75} src={trackImg} alt="" />
        <IconButton aria-label="Previous" onClick={() => this.onPrevClick()}>
          <SkipPreviousIcon />
        </IconButton>

        <IconButton aria-label="Play/pause" onClick={() => this.onPlayClick()}>
          {playing !== true ? (
            <PlayArrowIcon className={classes.playIcon} />
          ) : (
            <PauseIcon className={classes.playIcon} />
          )}
        </IconButton>
        <IconButton aria-label="Next" onClick={() => this.onNextClick()}>
          <SkipNextIcon />
        </IconButton>
        <CardContent className={classes.content}>
          <Typography variant="h5">{trackName}</Typography>
          <Typography variant="subheading" color="textSecondary">
            {artistName}
          </Typography>
        </CardContent>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainFooter);
