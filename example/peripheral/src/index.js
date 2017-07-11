import { createStore } from 'redux';
import { startPeripheral }  from 'redux-bluetooth/build/peripheral';

import reducer from './reducer';

let store = createStore(reducer);

startPeripheral('Counter', store);