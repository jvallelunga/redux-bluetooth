import * as TYPES from '../actions/types';
import * as STATUS from '../central/status';

import initial from './initial';

export function status(state = initial.status, { type }) {
  switch (type) {
    case TYPES.BLUETOOTH_CONNECTING:
      return STATUS.CONNECTING;
    case TYPES.BLUETOOTH_CONNECTED:
      return STATUS.CONNECTED;
    case TYPES.BLUETOOTH_DISCONNECTING:
      return STATUS.DISCONNECTING;
    case TYPES.BLUETOOTH_DISCONNECTED:
      return STATUS.DISCONNECTED;
    default:
      return state;
  }
}

export function remote(state = null, { type, payload }) {
  switch (type) {
    case TYPES.BLUETOOTH_SYNC:
      return payload;
    default:
      return state;
  }
}
