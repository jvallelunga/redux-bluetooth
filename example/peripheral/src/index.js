import { createStore } from 'redux';
import startPeripheral from 'redux-bluetooth/build/peripheral';

import reducer from './reducer';

const store = createStore(reducer);

startPeripheral('Counter', store);
