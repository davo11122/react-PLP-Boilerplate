import { createSelector } from 'reselect';
import { getSelectedCategories, getSelectedColors } from './filters';

export const getAllProducts = store => store.getIn(['products', 'productList']);

export const getAvailableProducts = createSelector(
  [getAllProducts, getSelectedCategories, getSelectedColors],
  (allProducts, categories, colors) => allProducts
    .filter(product =>
      product.categories
        .find(category => categories.includes(category))
      && product.colors
        .find(({ name }) => colors.includes(name)))
);
