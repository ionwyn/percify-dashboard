import { combineReducers } from 'redux';
import widgets from './widgets.reducer';
import spotilogin from './login.reducer';

const analyticsDashboardAppReducers = combineReducers({
  widgets,
  spotilogin
});

export default analyticsDashboardAppReducers;
