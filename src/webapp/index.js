import * as TYPES from './actions/types';
import * as STATUS from './central/status';
import ACTIONS from './actions';
import MIDDLEWARE from './middleware';
import * as REDUCERS from './reducers';
import STORE from './store';

const { connectStore, disconnectStore } = ACTIONS;

export const types = TYPES;
export const status = STATUS;
export const actions = { connectStore, disconnectStore };
export const reducers = REDUCERS;
export const middleware = MIDDLEWARE;
export const createSyncStore = STORE;
