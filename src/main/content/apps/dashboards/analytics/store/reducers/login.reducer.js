import * as Actions from '../actions';

/** The initial state; no tokens and no user info */
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

/**
 * Our reducer
 */
const spotilogin = (state = initialState, action) => {
  switch (action.type) {
    // when we get the tokens... set the tokens!
    case Actions.SPOTIFY_TOKENS: {
      const { accessToken, refreshToken } = action;
      return Object.assign({}, state, { accessToken, refreshToken });
    }

    // set our loading property when the loading begins
    case Actions.SPOTIFY_ME_BEGIN: {
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { loading: true })
      });
    }

    // when we get the data merge it in
    case Actions.SPOTIFY_ME_SUCCESS: {
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.data, { loading: false })
      });
    }

    // currently no failure state :(
    case Actions.SPOTIFY_ME_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
};

export default spotilogin;
