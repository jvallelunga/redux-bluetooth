/* global jest, test, expect */
import peripheral from '.';

jest.mock('./bleno', () => ({
  start: jest.fn().mockReturnValue('mockStart'),
}));

test('peripheral', () => {
  const result = peripheral(null, null);
  expect(result).toEqual('mockStart');
});
