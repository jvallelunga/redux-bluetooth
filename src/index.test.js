/* global jest, test, expect */
import bluetooth from '.';

jest.mock('./webapp', () => null);
jest.mock('./peripheral', () => null);

test('actions', () => {
  expect(Object.keys(bluetooth)).toEqual([
    'peripheral',
    'webapp',
  ]);
});
