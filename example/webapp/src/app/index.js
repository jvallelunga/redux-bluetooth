import { connect } from 'react-redux';
import { actions } from 'redux-bluetooth/build/webapp';

import { increment, decrement } from '../actions';

import Component from './component';

const mapState = (state) => {
  return state;
}

const mapAction = {
  onConnect: actions.connectStore,
  onIncrement: increment,
  onDecrement: decrement,
};

export { Component };
export default connect(mapState, mapAction)(Component);
