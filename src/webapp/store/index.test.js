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
  return expect(store).toBe('mockStore');
});
