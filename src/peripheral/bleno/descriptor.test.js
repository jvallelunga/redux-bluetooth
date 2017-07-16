/* global test, expect,  */
import Descriptor from './descriptor';

function Parent({ uuid, value }) {
  return { uuid, value };
}

test('descriptor', () => {
  const descriptor = Descriptor('mockUUID', Parent);

  expect(descriptor.uuid).toBe('mockUUID');
  expect(descriptor.value).toBe('Redux Characteristic.');
});
