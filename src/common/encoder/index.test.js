import TextEncoding from 'text-encoding';

import Encoder from '.';

const { encode , decode } = new Encoder(TextEncoding);

test('encode / decode', () => { 
  const data = encode({ type: 'TEST', payload: 'PAYLOAD' });
  const result = decode(data);

  expect(result).toEqual({ type: 'TEST', payload: 'PAYLOAD' });
});
