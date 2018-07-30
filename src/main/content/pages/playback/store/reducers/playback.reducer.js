import * as Actions from '../actions';

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null
  }
};

const initState = {
  _options: {
    name: '',
    id: '',
    volume: 0
  },
  _messageHandlers: {},
  _eventListeners: {
    initialization_error: [null],
    account_error: [null],
    playback_error: [null],
    player_state_changed: [null],
    ready: [null]
  },
  _connectionRequests: {},
  _getCurrentStateRequests: {},
  _getVolumeRequests: {},
  isLoaded: {}
};

const playbackr = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SGET_TOKENS: {
      const { accessToken } = action;
      return Object.assign({}, state, { accessToken });
    }

    case Actions.SGET_TRACKS: {
      return Object.assign({}, state, {
        tracks: Object.assign({}, state, action.data)
      });
    }

    default: {
      return state;
    }
  }
};

export default playbackr;
