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
  },
  bitch: []
};

const userRecommendations = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SGET_TOKENS: {
      const { accessToken } = action;
      return Object.assign({}, state, { accessToken });
    }

    case Actions.SGET_RECOMMEND: {
      return Object.assign({}, state, {
        state: Object.assign([], state, action.data)
      });
    }

    case Actions.SGET_SUGGESTIONS_SUCCESS: {
      console.log(action.data);
      return Object.assign({}, state, {
        bitch: action.data
      });
    }

    // currently no failure state :(
    case Actions.SGET_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
};

export default userRecommendations;
