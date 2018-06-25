import { combineReducers } from 'redux';
import fuse from './fuse';
import auth from 'auth/store/reducers/index';
import quickPanel from 'main/quickPanel/store/reducers';
import analyticsDashboardApp from 'main/content/apps/dashboards/analytics/store/reducers/index';

const rootReducer = combineReducers({
  auth,
  fuse,
  analyticsDashboardApp,
  quickPanel
});

export default rootReducer;
