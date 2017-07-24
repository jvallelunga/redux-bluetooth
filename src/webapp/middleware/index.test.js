/* global jest, test, expect, beforeEach, afterEach */
import middleware from '.';

jest.mock('../actions', () => ({
  sendAction: jest.fn().mockReturnValue('mockAction'),
}));

let store = null;
let next = null;

beforeEach(() => {
  store = {
    dispatch: jest.fn(),
  };
  next = jest.fn();
});

afterEach(() => {
  store = null;
  next = null;
});

test('actions empty', () => {
  middleware()(store)(next)({ type: 'ACTION' });
  expect(next).toBeCalledWith({ type: 'ACTION' });
});

test('actions not included', () => {
  middleware(['ACTION'])(store)(next)({ type: 'NOTEXISTS' });
  expect(next).toBeCalledWith({ type: 'NOTEXISTS' });
});

test('actions included', () => {
  middleware(['ACTION'])(store)(next)({ type: 'ACTION' });
  expect(store.dispatch).toBeCalledWith('mockAction');
  expect(next).toBeCalledWith({ type: 'ACTION' });
});

test('actions request', () => {
  const request = jest.fn();
  const action = { type: '@@bluetooth/CONNECT_REQUEST', request };
  middleware(['ACTION'])(store)(next)(action);
  expect(request).toBeCalledWith(store.dispatch);
  expect(next).toBeCalledWith(action);
});

test('actions not an object', () => {
  const funcAction = jest.fn();
  middleware(['ACTION'])(store)(next)(funcAction);
  expect(next).toBeCalledWith(funcAction);
});
