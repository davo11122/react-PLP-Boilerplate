import { handleActions } from 'redux-actions';
import { OrderedMap, Map } from 'immutable';
import { fetchProducts } from '../actions/product';

const defaultState = new Map({
  productList: new OrderedMap({}),
  offset: 0
});

export default handleActions({
  [fetchProducts](state, {
    payload: {
      productList,
      offset = 0
    }
  }) {
    return state
      .updateIn(
        ['productList'],
        existingList => existingList.merge(productList)
      )
      .set('offset', offset);
  }
}, defaultState);

