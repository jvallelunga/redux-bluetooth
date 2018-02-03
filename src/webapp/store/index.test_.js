/* global jest, test, expect */
import createSyncStore from '.';

jest.mock('redux', () => ({
  createStore: jest.fn().mockReturnValue('mockStore'),
  applyMiddleware: jest.fn(),
  compose: jest.fn(),
}));

jest.mock('../middleware', () => jest.fn());
jest.mock('../reducers', () => jest.fn());

test('createSyncStore', () => {
  const store = createSyncStore(['ACTION']);
  expect(store).toBe('mockStore');
});


test('createSyncStore: debug', () => {
  /* eslint-disable no-underscore-dangle */
  global.__REDUX_DEVTOOLS_EXTENSION__ = jest.fn();

  const store = createSyncStore(['ACTION']);
  expect(store).toBe('mockStore');

  expect(global.__REDUX_DEVTOOLS_EXTENSION__).toHaveBeenCalled();
  /* eslint-enable */
});
