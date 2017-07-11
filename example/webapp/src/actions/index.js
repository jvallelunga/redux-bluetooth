import * as TYPES from './types';

export function increment() {
  return { type: TYPES.INCREMENT };
}

export function decrement() {
  return { type: TYPES.DECREMENT };
}
