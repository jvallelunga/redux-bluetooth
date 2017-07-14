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
