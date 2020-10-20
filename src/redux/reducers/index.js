import { combineReducers } from 'redux';

import collectionsReducer from './collections';

export default combineReducers({
  collections: collectionsReducer,
});
