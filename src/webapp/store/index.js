/* global window */
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';

import middleware from '../middleware';
import { status, remote } from '../reducers';

export default (actions, reducer = () => true) => {
  const middlewares = [middleware(actions)];
  const enhancers = [applyMiddleware(...middlewares)];

  /* eslint-disable no-underscore-dangle */
  if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  /* eslint-enable */

  return createStore(
    combineReducers({
      status,
      remote,
      local: reducer,
    }),
    compose(...enhancers),
  );
};
