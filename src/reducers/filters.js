import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { fetchProducts } from '../actions/product';
import { toggleAFilter } from '../actions/filter';

const defaultState = new Map({
  colors: new Map(),
  categories: new Map(),
  colorHistory: new List()
});

export default handleActions({
  [fetchProducts](store, {
    payload: {
      productList
    }
  }) {
    const { colors, categories } = productList.reduce(({ colors, categories }, product) => {
      product.colors
        .forEach(theColor => colors.update(theColor.name, v => v || false));

      product.categories
        .forEach(theCategory => categories.update(theCategory, v => v || false));
      return { categories, colors };
    }, {
      colors: store.get('colors').asMutable(),
      categories: store.get('categories').asMutable()
    });
    return store
      .set('colors', colors.asImmutable())
      .set('categories', categories.asImmutable());
  },
  [toggleAFilter](store, {
    payload: { type, optionName }
  }) {
    return store.updateIn([type, optionName], status => !status);
  }
}, defaultState);
