import ACTIONS from '../actions';
import * as TYPES from '../actions/types';

const { sendAction } = ACTIONS;

const {
  BLUETOOTH_CONNECT_REQUEST,
  BLUETOOTH_SEND_REQUEST,
} = TYPES;

const REQUESTS = [
  BLUETOOTH_CONNECT_REQUEST,
  BLUETOOTH_SEND_REQUEST,
];

export default (actions = []) => store => next => (action) => {
  if (typeof action !== 'object') {
    return next(action);
  }
  const { type } = action;
  if (REQUESTS.includes(type)) action.request(store.dispatch);
  if (actions.includes(type)) store.dispatch(sendAction(action));
  return next(action);
};
