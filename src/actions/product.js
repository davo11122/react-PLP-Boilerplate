import { createAction } from 'redux-actions';
import __DATA_SOURCE from '../data/newProducts.json';
import { convertProductList } from '../utlis';


export const fetchProducts = createAction('FETCH_PRODUCTS', ({ offset = 0 }) => ({
  productList: convertProductList(__DATA_SOURCE.splice(offset, 10)),
  offset
}));
