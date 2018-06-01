/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Papers from 'react-md/lib/Papers';
import { Card, CardTitle, CardText, CardActions } from 'react-md/lib/Cards';
import Media from 'react-md/lib/Media/Media';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';
import FontIcon from 'react-md/lib/FontIcons';
import { getSelectedColors } from '../selectors/filters';


import './ProductItem.scss';

@connect(store => ({
  filterColors: getSelectedColors(store)
}))
export default class ProductItem extends PureComponent {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string,
      colors: PropTypes.arrayOf(PropTypes.shape({

      }))
    })
  };
  /**
   * UNFORTUNATELY ESLint does't support 'getDerivedStateFromProps' and side effects at the moment
   * */
  static getDerivedStateFromProps(props, state) {
    if (props.filterColors !== state.prevFilterColors) {
      return {
        selectedColor: props.product.colors
          .findIndex(color => props.filterColors.contains(color.name)),
        prevFilterColors: props.filterColors
      };
    }
    return null;
  }

  state = {
    visibleImageIndex: 0,
    selectedColor: 0
  };

  switchVisibleImage = () => {
    this.setState({
      visibleImageIndex: 1 - this.state.visibleImageIndex
    });
  };

  handleMediaInteractions = () => {
    this.switchVisibleImage();
  };

  changeColor = (colorIndex) => {
    this.setState({
      selectedColor: colorIndex * 1
    });
  };

  renderColorItem = (color, index) => ({
    value: index,
    label: '',
    checkedRadioIcon: (<span className={`md-${color.name}-300--text`}>
      <FontIcon className={`md-${color.name}-200--text`}>blur_circular</FontIcon>
    </span>),
    uncheckedRadioIcon: (<span className={`md-${color.name}-300--text`}>
      <FontIcon className={`md-${color.name}-200--text`}>blur_on</FontIcon>
    </span>)
  });

  render() {
    const {
      props: {
        product
      },
      state: {
        selectedColor,
        visibleImageIndex
      },
      handleMediaInteractions,
      renderColorItem
    } = this;

    return (<Papers
      zDepth={1}
      className="product-item"
    >
      <Card>
        <CardText>
          <Media
            aspectRatio="393-293"
          >
            <img
              className="product-item__image"
              src={product.colors[selectedColor].images[visibleImageIndex]}
              alt={product.name}
              onMouseEnter={handleMediaInteractions}
              onMouseLeave={handleMediaInteractions}
            />
          </Media>
        </CardText>
        <CardTitle title={product.name} subtitle={`$${product.colors[selectedColor].price}`} />
        <CardActions centered>
          <SelectionControlGroup
            onChange={this.changeColor}
            value={selectedColor}
            id={`switching-color-${product.id}`}
            name={`switching-color-${product.id}`}
            type="radio"
            inline
            controls={product.colors.map(renderColorItem)}
          />
        </CardActions>
      </Card>
    </Papers>);
  }
}
