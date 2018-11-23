import * as Actions from '../actions';

const selectedItemReducer = (state = '1', action) => {
  switch (action.type) {
    case Actions.SET_SELECTED_ITEM:
      return action.payload;
    default:
      return state;
  }
};

export default selectedItemReducer;
