/* global jest, beforeEach, afterEach, test, expect */
import Reducer from '.';

test('type: UNKNOWN', () => {
  const reducer = Reducer();

  const originalState = { };
  const nextState = reducer(originalState, { type: 'UNKNOWN' });

  return expect(nextState).toBe(originalState);
});
