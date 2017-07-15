import BLUETOOTH from './bleno';
import STORE from './store';

export const bluetooth = BLUETOOTH;
export const connectSyncStore = STORE(BLUETOOTH);
