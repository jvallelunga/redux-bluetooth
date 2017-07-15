/* global jest, test, expect */
import * as peripheral from '.';

jest.mock('./bleno', () => null);
jest.mock('./store', () => () => null);

test('actions', () => {
  expect(Object.keys(peripheral)).toEqual([
    'bluetooth',
    'connectSyncStore',
  ]);
});
