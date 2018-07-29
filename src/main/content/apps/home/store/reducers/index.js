import { combineReducers } from 'redux';
import userTopMetrics from './data.reducer';

const userTopReducer = combineReducers({
  userTopMetrics
});

export default userTopReducer;
