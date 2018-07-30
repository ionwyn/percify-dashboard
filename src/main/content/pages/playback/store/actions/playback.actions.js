import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

export const PLAYBACK_INIT = 'PLAYBACK_INIT';
export const INIT_SUCCESS = 'INIT_SUCCESS';
export const STATE_CHANGE = 'STATE_CHANGE';
export const CHECK_FOR_PLAYER = 'CHECK_FOR_PLAYER';
export const CREATE_EVENT_HANDLER = 'CREATE_EVENT_HANDLER';

export function handleLogin() {
  console.log('trying');
  if (this.state.token !== '') {
    // change the loggedIn variable, then start checking for the window.Spotify variable
    this.setState({
      loggedIn: true
    });
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }
}

// when we receive a new update from the player
export function onStateChanged(state) {
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
      error: 'Playback has stopped because you have switched to another device'
    });
  }
}

export function createEventHandlers() {
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
    await this.setState({
      deviceId: device_id
    });
    this.transferPlaybackHere();
  });
}

export function checkForPlayer() {
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
    // set up the player's event handlers
    this.createEventHandlers();

    // finally, connect!
    this.player.connect();
  }
}
