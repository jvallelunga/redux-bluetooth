/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { createSyncStore } from 'redux-bluetooth/build/webapp';

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
