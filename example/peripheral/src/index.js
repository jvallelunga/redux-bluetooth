import { createStore } from 'redux';
import startPeripheral from 'redux-bluetooth/build/peripheral';

import reducer from './reducer';
import output from './output';

const store = createStore(reducer);

output(store);
startPeripheral('Counter', store);

