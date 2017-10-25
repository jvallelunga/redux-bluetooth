import predatorQuotes from 'predator-quotes';
import * as TYPES from './types';

export function increment() {
  return {
    type: TYPES.INCREMENT,
    payload: predatorQuotes.random(),
  };
}

export function decrement() {
  return {
    type: TYPES.DECREMENT,
    payload: predatorQuotes.random(),
  };
}
