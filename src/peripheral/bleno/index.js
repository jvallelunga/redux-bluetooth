import util from 'util';
import BLENO from 'bleno';
import TextEncoding from 'text-encoding';

import { BLENO_CONFIG } from '../../common/config';
import Encoder from '../../common/encoder';

import Service from './service';
import Characteristic from './characteristic';
import Descriptor from './descriptor';

export function Bleno(bleno, encoder, { SERVICE_UUID, CHARACTERISTIC_UUID, DESCRIPTOR_UUID }) {
  const descriptor = Descriptor(DESCRIPTOR_UUID, bleno.Descriptor);

  const characteristic = Characteristic(
    CHARACTERISTIC_UUID,
    bleno.Characteristic,
    util,
    descriptor,
    encoder,
  );

  const service = Service(SERVICE_UUID, bleno.PrimaryService, util, characteristic);

  const start = (name, store) => {
    bleno.on('stateChange', (state) => {
      if (state === 'poweredOn') {
        bleno.startAdvertising(name, [SERVICE_UUID], (err) => {
          if (err) console.log('startAdvertising.err: ', err);
        });
      } else {
        bleno.stopAdvertising();
        characteristic.disconnect();
      }
    });

    bleno.on('advertisingStart', (err) => {
      if (!err) {
        bleno.setServices([service]);
        characteristic.connect(store);
      }
    });
  };

  return { start };
}

export default new Bleno(BLENO, Encoder(TextEncoding), BLENO_CONFIG);
