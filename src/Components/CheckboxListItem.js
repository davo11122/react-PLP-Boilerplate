import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'react-md/lib/FontIcons';
import ListItemControl from 'react-md/lib/Lists/ListItemControl';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import './ChechboxListItem.scss';

export default class CheckboxListItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
    name: PropTypes.string.isRequired,
    rightIcon: PropTypes.node
  };


  render() {
    const { label = '', rightIcon, ...props } = this.props;
    return (
      <ListItemControl
        primaryText={label}
        primaryAction={
          <Checkbox
            {...props}
            checkedIcon={<FontIcon>check</FontIcon>}
            uncheckedIcon={<FontIcon>check_box_outline_blank</FontIcon>}
          />
        }
        rightIcon={rightIcon}
      />
    );
  }
}
