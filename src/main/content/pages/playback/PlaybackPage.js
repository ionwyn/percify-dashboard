import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { Card, CardContent, Grow } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover'
  },
  card: {
    width: '100%',
    maxWidth: 384
  }
});

class PlaybackPage extends Component {
  constructor(props) {
    super(props);
    // set the initial state
    this.state = {
      token: '',
      deviceId: '',
      error: '',
      trackName: 'Track Name',
      artistName: 'Artist Name',
      albumName: 'Album Name',
      playing: false,
      position: 0,
      duration: 1
    };
    // this will later be set by setInterval
    this.playerCheckInterval = null;
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
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(', ');
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
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
    const { classes } = this.props;
    const {
      token,
      trackName,
      artistName,
      albumName,
      error,
      playing
    } = this.state;

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
                <img
                  className="w-128 m-32"
                  src="assets/images/logos/fuse.svg"
                  alt="logo"
                />

                <div>
                  <p>Artist: {artistName}</p>
                  <p>Track: {trackName}</p>
                  <p>Album: {albumName}</p>
                  <p>
                    <button onClick={() => this.onPrevClick()}>Previous</button>
                    <button onClick={() => this.onPlayClick()}>
                      {playing ? 'Pause' : 'Play'}
                    </button>
                    <button onClick={() => this.onNextClick()}>Next</button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </Grow>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PlaybackPage);
