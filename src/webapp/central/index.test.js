/* global jest, test, expect */
import central from '.';
import Central from './central';
import { CENTRAL_CONFIG } from '../../common/config';

jest.mock('../../common/encoder', () => () => true);

global.TextEncoder = null;
global.TextDecoder = null;
global.navigator = { bluetooth: null };

test('central', () => {
  const result = new Central(
    null,
    true,
    CENTRAL_CONFIG,
  );

  expect(Object.keys(central)).toEqual(Object.keys(result));
});
