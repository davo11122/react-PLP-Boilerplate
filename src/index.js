import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import configureStore from './store/configureStore';

import RootContainer from './Containers/RootContainer';

const initialState = Immutable.Map();
const store = configureStore(initialState);


ReactDOM.render((<Provider store={store}>
  <RootContainer />
</Provider>), document.getElementById('index'));

