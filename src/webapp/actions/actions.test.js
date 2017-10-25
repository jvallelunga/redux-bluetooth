/* global jest, beforeEach, afterEach, test, expect */
import * as TYPES from './types';
import Actions from './actions';

let dispatch = null;
let central = null;

beforeEach(() => {
  dispatch = jest.fn();
  central = {
    connect: jest.fn().mockReturnValue(Promise.resolve()),
    handler: jest.fn(),
    read: jest.fn().mockReturnValue(Promise.resolve('mockState')),
    write: jest.fn().mockReturnValue(Promise.resolve()),
  };
});

afterEach(() => {
  dispatch = null;
  central = null;
});

test('syncState', () => {
  const { syncState } = Actions(central, TYPES);
  const action = syncState('mockState');

  expect(action).toEqual({
    type: TYPES.BLUETOOTH_SYNC,
    payload: 'mockState',
  });
});

test('connectStore', () => {
  const { connectStore } = Actions(central, TYPES);
  const action = connectStore('mockName');
  expect.assertions(9);

  expect(action.type).toEqual(TYPES.BLUETOOTH_CONNECT_REQUEST);

  const promise = action.request(dispatch).then(() => {
    expect(central.connect).toBeCalled();
    expect(central.handler).toBeCalled();

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: TYPES.BLUETOOTH_CONNECTING });
    expect(dispatch.mock.calls[1][0]).toEqual({ type: TYPES.BLUETOOTH_CONNECTED });

    const syncStore = dispatch.mock.calls[2][0];
    expect(syncStore.type).toEqual(TYPES.BLUETOOTH_SEND_REQUEST);
    return syncStore.request(dispatch);
  }).then(() => {
    expect(central.write).toBeCalled();

    return true;
  });

  return expect(promise).resolves.toBe(true);
});

test('sendAction', () => {
  const { sendAction } = Actions(central, TYPES);
  const action = sendAction('mockAction');
  expect.assertions(3);

  expect(action.type).toEqual(TYPES.BLUETOOTH_SEND_REQUEST);

  const promise = action.request(dispatch).then(() => {
    expect(central.write).toBeCalledWith('mockAction');

    return true;
  });

  return expect(promise).resolves.toBe(true);
});
