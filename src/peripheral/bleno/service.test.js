/* global test, expect,  */
import util from 'util';

import Service from './service';

function Parent({ uuid, characteristics }) {
  this.uuid = uuid;
  this.characteristics = characteristics;
}

test('service', () => {
  const service = Service('mockUUID', Parent, util, 'mockCharacteristic');

  expect(service.uuid).toBe('mockUUID');
  expect(service.characteristics).toEqual(['mockCharacteristic']);
});
