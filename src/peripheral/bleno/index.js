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

  const start = (name, state) => {
    bleno.on('stateChange', (status) => {
      if (status === 'poweredOn') {
        bleno.startAdvertising(name, [SERVICE_UUID], (err) => {
          if (!err) characteristic.updateState(state);
        });
      } else {
        bleno.stopAdvertising();
      }
    });

    bleno.on('advertisingStart', (err) => {
      if (!err) {
        bleno.setServices([service]);
      }
    });
  };

  const handler = (callback) => {
    characteristic.onAction = callback;
  };

  const notify = (state) => {
    characteristic.updateState(state);
  };

  return {
    start,
    handler,
    notify,
  };
}

export default new Bleno(BLENO, Encoder(TextEncoding), BLENO_CONFIG);
