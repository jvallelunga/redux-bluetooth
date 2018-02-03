/* global test, expect */
import * as STATUS from '../central/status';
import * as TYPES from '../actions/types';

import initial from './initial';
import Reducer from '.';

test('Default State', () => {
  const reducer = Reducer();

  const nextState = reducer(undefined, { type: 'UNKNOWN' });

  return expect(nextState).toBe(initial);
});

test('type: UNKNOWN', () => {
  const reducer = Reducer();

  const originalState = { };
  const nextState = reducer(originalState, { type: 'UNKNOWN' });

  return expect(nextState).toBe(originalState);
});

test('type: BLUETOOTH_CONNECTING', () => {
  const reducer = Reducer();

  const originalState = { };
  const nextState = reducer(originalState, { type: TYPES.BLUETOOTH_CONNECTING });

  return expect(nextState).toEqual({ status: STATUS.CONNECTING });
});

test('type: BLUETOOTH_CONNECTED', () => {
  const reducer = Reducer();

  const originalState = { };
  const nextState = reducer(originalState, { type: TYPES.BLUETOOTH_CONNECTED });

  return expect(nextState).toEqual({ status: STATUS.CONNECTED });
});

test('type: BLUETOOTH_SYNC', () => {
  const reducer = Reducer();

  const originalState = { };
  const nextState = reducer(originalState, { type: TYPES.BLUETOOTH_SYNC, payload: 'mockPayload' });

  return expect(nextState).toEqual({ store: 'mockPayload' });
});

test('type: BLUETOOTH_SYNC, autosync: false', () => {
  const reducer = Reducer(false);

  const originalState = { };
  const nextState = reducer(originalState, { type: TYPES.BLUETOOTH_SYNC, payload: 'mockPayload' });

  return expect(nextState).toEqual({ });
});

