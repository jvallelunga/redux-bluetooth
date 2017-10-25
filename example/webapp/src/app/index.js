import { connect } from 'react-redux';
import { actions } from 'redux-bluetooth/build/webapp';

import { increment, decrement } from '../actions';

import Component from './component';

const mapState = ({ status, store }) => ({
  status,
  ...store,
});

const mapAction = {
  onConnect: actions.connectStore,
  onIncrement: increment,
  onDecrement: decrement,
};

export { Component };
export default connect(mapState, mapAction)(Component);
