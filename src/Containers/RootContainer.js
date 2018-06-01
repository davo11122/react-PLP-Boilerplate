import React from 'react';
import Grid from 'react-md/lib/Grids/Grid';
import Cell from 'react-md/lib/Grids/Cell';
import Divider from 'react-md/lib/Dividers';
import ProductsContainer from 'Containers/ProductsContainer';
import ProductItem from 'Components/ProductItem';
import Filters from 'Components/Filters';

import './RootContainer.scss';

export default function RootContainer() {
  return (<div className="main">
    <Grid>
      <Cell size={12}>
        <h1 className="md-text-center">Simple React PLP Page</h1>
      </Cell>
    </Grid>
    <Divider />
    <Grid>
      <Cell size={12}>
        <Filters />
      </Cell>

    </Grid>
    <Divider />
    <Grid>
      <ProductsContainer>
        {(product, productID) => (<Cell key={productID}>
          <ProductItem product={product} />
        </Cell>)}
      </ProductsContainer>
    </Grid>
  </div>);
}

