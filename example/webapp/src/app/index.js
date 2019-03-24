import { connect } from 'react-redux';
import { actions } from '../../../../build/webapp';

import { increment, decrement } from '../actions';

import Component from './component';

const mapState = (state) => {
  const { status, remote } = state;
  return ({
    status,
    ...remote,
  });
};

const mapAction = {
  onConnect: actions.connectStore,
  onIncrement: increment,
  onDecrement: decrement,
};

export { Component };
export default connect(mapState, mapAction)(Component);
