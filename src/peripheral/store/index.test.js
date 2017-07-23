/* global jest, test, expect, beforeEach, afterEach */
import connectSyncStore from '.';

let store = null;
let bleno = null;

beforeEach(() => {
  bleno = {
    start: jest.fn(),
    handler: jest.fn(),
    notify: jest.fn(),
  };

  store = {
    subscribe: jest.fn(),
    getState: jest.fn().mockReturnValue('mockState'),
    dispatch: jest.fn(),
  };
});

afterEach(() => {
  store = null;
  bleno = null;
});

test('connectSyncStore', () => {
  const { handleSubscribe, handleActions } = connectSyncStore(bleno)('mockName', store);

  expect(bleno.start).toBeCalledWith('mockName', 'mockState');
  expect(store.subscribe).toBeCalled();
  expect(bleno.handler).toBeCalled();

  handleSubscribe();
  expect(bleno.notify).toBeCalledWith('mockState');
  expect(store.getState.mock.calls.length).toBe(2);

  handleActions('mockAction');
  expect(store.dispatch).toBeCalledWith('mockAction');
});
