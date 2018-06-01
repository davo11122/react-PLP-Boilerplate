import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import FontIcon from 'react-md/lib/FontIcons';
import CheckboxListItem from './CheckboxListItem';
import { getCategories, getColors } from '../selectors/filters';
import { toggleAFilter } from '../actions/filter';
import './Filters.scss';

@connect(store => ({
  colors: getColors(store),
  categories: getCategories(store)
}), {
  toggleAFilter
})
export default class Filters extends PureComponent {
  static propTypes = {
    colors: PropTypes.instanceOf(Map),
    categories: PropTypes.instanceOf(Map),
    toggleAFilter: PropTypes.func
  };
  typeMapping = {
    colors: color => <FontIcon className={`md-${color}-200--text`}>blur_on</FontIcon>,
    categories: category => category
  };
  toggleAFilter = (type, optionName) => () => {
    this.props.toggleAFilter({ type, optionName });
  };

  renderListItem = type => (isSelected, name = '') => (<CheckboxListItem
    id={`${type}-filter-item-${name}`}
    checked={isSelected}
    key={name}
    onChange={this.toggleAFilter(type, name)}
    name={name}
    label={this.typeMapping[type](name)}
  />);

  render() {
    const {
      props: {
        colors = [],
        categories = []
      }
    } = this;

    return (<React.Fragment>
      <div className="product-filters">
        {colors.size &&
          <MenuButton
            className="product-filters__picker"
            id="color-filter-dropdown"
            anchor={{
            x: MenuButton.HorizontalAnchors.INNER_LEFT,
            y: MenuButton.VerticalAnchors.TOP
          }}
            position={MenuButton.Positions.TOP_LEFT}
            raised
            iconChildren="keyboard_arrow_down"
            menuItems={colors.map(this.renderListItem('colors')).valueSeq().toJS()}
          >
          Colors
          </MenuButton>
        }
        {categories.size &&
        <MenuButton
          id="category-filter-dropdown"
          className="product-filters__picker"
          listClassName="product-filters__list-wrapper"
          anchor={{
            x: MenuButton.HorizontalAnchors.INNER_LEFT,
            y: MenuButton.VerticalAnchors.TOP
          }}
          position={MenuButton.Positions.TOP_LEFT}
          raised
          iconChildren="keyboard_arrow_down"
          menuItems={categories.map(this.renderListItem('categories')).valueSeq().toJS()}
        >
          Categories
        </MenuButton>
        }
      </div>
    </React.Fragment>);
  }
}
