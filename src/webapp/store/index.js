/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import middleware from '../middleware';
import reducers from '../reducers';

export default (actions) => {
  const middlewares = [middleware(actions), thunk];
  const enhancers = [applyMiddleware(...middlewares)];

  /* eslint-disable no-underscore-dangle */
  if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  /* eslint-enable */

  return createStore(reducers(), compose(...enhancers));
};
