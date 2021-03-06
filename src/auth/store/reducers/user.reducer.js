import * as Actions from '../actions';

const initialState = {
  role: 'guest',
  data: {
    displayName: 'Fake News',
    photoURL: 'assets/images/avatars/profile.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['calendar', 'mail', 'contacts', 'analytics-dashboard']
  },
  images: [
    {
      height: null,
      url: 'assets/images/avatars/profile.jpg',
      width: null
    }
  ]
};

const user = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      return {
        ...initialState,
        ...action.payload
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
