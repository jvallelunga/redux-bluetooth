import { CENTRAL_CONFIG } from '../../common/config';
import Encoder from '../../common/encoder';

export function Central(
  bluetooth, 
  { encode, decode }, 
  { SERVICE_UUID, CHARACTERISTIC_UUID }) { 
  
  const state = {
    server: null,
    characteristic: null,
  } 

  const connect = (name) => { 
    return bluetooth.requestDevice({
      filters: [{ services: [ SERVICE_UUID ], name: name }]
    })
    .then((device) => device.gatt.connect())
    .then((server) => { 
      state.server = server;
      return server.getPrimaryService(SERVICE_UUID)
    })
    .then((service) => service.getCharacteristic(CHARACTERISTIC_UUID))    
    .then((characteristic) => {
      state.characteristic = characteristic;
    });    
  };

  const handler = ( callback ) => { 
    return state.characteristic.startNotifications()
    .then(() => {
      state.characteristic.addEventListener('characteristicvaluechanged', (event) => { 
        callback(decode(event.target.value));
      });
    });
  }

  const read = () => { 
    if ( state.server && state.server.connected && state.characteristic ) { 
      return state.characteristic.readValue().then(data => { 
        return decode(data);
      });
    }
    return Promise.reject(new Error('Bluetooth: Not Connected'));
  }

  const write = (action) => { 
    if ( state.server && state.server.connected && state.characteristic ) { 
      const stringify = JSON.stringify(action);
      const serialized = encode(stringify);

      return state.characteristic.writeValue(serialized);
    }    
  }

  return { 
    connected: state.server && state.server.connected,
    connect, 
    handler,
    read,
    write
  }
}

export default new Central(
  navigator.bluetooth,
  Encoder({ TextEncoder, TextDecoder }),
  CENTRAL_CONFIG
);
