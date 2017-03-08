import { combineReducers } from 'redux';
import entities from './ducks/entitiesDucks';
import active from './ducks/activeDucks';
import isLoaded from './ducks/isLoadedDucks';

export default combineReducers({
  entities,
  active,
  isLoaded,
});
