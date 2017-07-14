export default function Central(
  bluetooth,
  { encode, decode },
  { SERVICE_UUID, CHARACTERISTIC_UUID }) {
  const state = {
    server: null,
    characteristic: null,
  };

  const connect = name => bluetooth
      .requestDevice({
        filters: [{ services: [SERVICE_UUID], name }],
      })
      .then(device => device.gatt.connect())
      .then((server) => {
        state.server = server;
        return server.getPrimaryService(SERVICE_UUID);
      })
      .then(service => service.getCharacteristic(CHARACTERISTIC_UUID))
      .then((characteristic) => {
        state.characteristic = characteristic;
      });

  const handler = callback => state.characteristic.startNotifications().then(() => {
    const listerner = event => callback(decode(event.target.value));
    state.characteristic.addEventListener('characteristicvaluechanged', listerner);
    return listerner;
  });

  const read = () => {
    if (state.server && state.server.connected && state.characteristic) {
      return state.characteristic.readValue().then(data => decode(data));
    }
    return Promise.reject(new Error('Bluetooth: Not Connected'));
  };

  const write = (action) => {
    if (!state.server || !state.server.connected || !state.characteristic) return null;
    const stringify = JSON.stringify(action);
    const serialized = encode(stringify);

    return state.characteristic.writeValue(serialized);
  };

  return {
    connected: state.server && state.server.connected,
    connect,
    handler,
    read,
    write,
  };
}
