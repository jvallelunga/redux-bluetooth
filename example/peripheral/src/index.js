import { createStore } from 'redux';
import { connectSyncStore } from 'redux-bluetooth/build/peripheral';

import reducer from './reducer';
import output from './output';

const store = createStore(reducer);

output(store);
connectSyncStore('Counter', store);
