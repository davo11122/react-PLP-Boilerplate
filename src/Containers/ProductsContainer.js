import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';
import { fetchProducts } from '../actions/product';
import { getAvailableProducts } from '../selectors/products';

@connect(store => ({
  productList: getAvailableProducts(store)
}), {
  fetchProducts
})
export default class ProductsContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.func,
    fetchProducts: PropTypes.func,
    productList: PropTypes.instanceOf(OrderedMap)
  };
  componentDidMount() {
    this.props.fetchProducts({ offset: 0 });
  }
  render() {
    const {
      productList
    } = this.props;

    return productList.map(this.props.children).toList();
  }
}

