/* global jest, test, expect */
import * as webapp from '.';

jest.mock('./actions/types', () => true);
jest.mock('./central/status', () => true);
jest.mock('./actions', () => true);
jest.mock('./middleware', () => true);
jest.mock('./reducers', () => true);
jest.mock('./store', () => true);

test('actions', () => {
  expect(Object.keys(webapp)).toEqual([
    'types',
    'status',
    'actions',
    'reducers',
    'middleware',
    'createSyncStore',
  ]);
});
