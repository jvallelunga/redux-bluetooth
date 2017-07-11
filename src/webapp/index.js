import * as TYPES from './actions/types';
import * as STATUS from './central/status';
import ACTIONS from './actions';
import MIDDLEWARE from './middleware';
import REDUCERS from './reducers';
import STORE from './store';

const { connectStore, syncStore } = ACTIONS;

export const types = TYPES;
export const status = STATUS;
export const actions = { connectStore, syncStore };
export const reducers = REDUCERS;
export const middleware = MIDDLEWARE;
export const createSyncStore = STORE;
