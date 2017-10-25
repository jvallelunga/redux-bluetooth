/* global jest, test, expect */
import actions from '.';

jest.mock('../central', () => null);

test('actions', () => {
  expect(Object.keys(actions)).toEqual([
    'connectStore',
    'syncState',
    'sendAction',
  ]);
});
