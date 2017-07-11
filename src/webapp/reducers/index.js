import * as TYPES from '../actions/types';
import * as STATUS from '../central/status';

const initial = { 
  status: STATUS.INIT
};

export default (autosync = true) => (state = initial, { type, payload }) => {
  switch (type) { 
    case TYPES.BLUETOOTH_CONNECTING: 
      return Object.assign({}, state, { status: STATUS.CONNECTING });
    case TYPES.BLUETOOTH_CONNECTED:
      return Object.assign({}, state, { status: STATUS.CONNECTED });
    case TYPES.BLUETOOTH_SYNC:
      return autosync ? Object.assign({}, state, { store: payload }) : state;
    default: 
      return state; 
  }
};
