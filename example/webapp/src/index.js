/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';

import { createSyncStore } from '../../../build/webapp';

import './index.css';
import * as TYPES from './actions/types';

import App from './app';

const ACTIONS = Object.keys(TYPES);

/* eslint-disable react/jsx-filename-extension */
const store = createSyncStore(ACTIONS);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
/* eslint-enable */


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
