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

const userTopMetrics = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SGET_TOKENS: {
      const { accessToken } = action;
      return Object.assign({}, state, { accessToken });
    }

    case Actions.SGET_TRACKS: {
      return Object.assign({}, state, {
        tracks: Object.assign([], state, action.data)
      });
    }

    case Actions.SGET_ARTISTS: {
      return Object.assign({}, state, {
        artists: Object.assign([], state, action.data)
      });
    }

    default: {
      return state;
    }
  }
};

export default userTopMetrics;
