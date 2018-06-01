import { combineReducers } from 'redux-immutable';
import products from './products';
import filters from './filters';

export default combineReducers({
  products,
  filters
});
