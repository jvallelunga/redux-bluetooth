/* global test, expect */
import TextEncoding from 'text-encoding';

import Encoder from '.';

const { encode, decode } = new Encoder(TextEncoding);

test('encode / decode', () => {
  const message = JSON.stringify({ type: 'TEST', payload: 'PAYLOAD' });
  const data = encode(message);
  const result = decode(data);

  expect(result).toEqual(message);
});

