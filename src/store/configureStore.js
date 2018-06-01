import { createStore, applyMiddleware, compose } from 'redux';


// TODO: Add enviorment dependecy for logging
// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(logger),

      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
