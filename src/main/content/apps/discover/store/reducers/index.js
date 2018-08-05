import { combineReducers } from 'redux';
import userRecommendations from './discover.reducer';

const userRecommendReducer = combineReducers({
  userRecommendations
});

export default userRecommendReducer;
