import { OrderedMap } from 'immutable';

export const convertProductList = products =>
  products.reduce(
    (finalList, product) =>
      finalList.set(product.id, Object.assign(product, {
        colors: product.colors.sort((c1, c2) => c1.name < c2.name)
      })),
    new OrderedMap()
  );
