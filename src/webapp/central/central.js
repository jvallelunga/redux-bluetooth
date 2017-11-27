export default function Central(
  id,
  bluetooth,
  { encode, decode },
  { SERVICE_UUID, CHARACTERISTIC_UUID }) {
  const state = {
    server: null,
    characteristic: null,
    message: '',
    configuration: {
      limit: 20, // HARDCODE: https://devzone.nordicsemi.com/question/3860/largest-allowed-setting-for-variable-length-characteristic/
    },
    id,
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

  const listener = callback => (event) => {
    const chunk = decode(event.target.value);
    const message = `${state.message}${chunk}`;
    if (message.startsWith('[[[') && message.endsWith(']]]')) {
      const json = JSON.parse(message.slice(3, message.length - 3));
      callback(json);
      state.message = '';
    } else if (message.startsWith('|||') && message.endsWith('|||')) {
      state.message = '';
    } else {
      state.message = message;
    }
    return state.message;
  };

  const handler = callback => state.characteristic.startNotifications()
    .then(() => {
      const eventListener = listener(callback);
      state.characteristic.addEventListener('characteristicvaluechanged', eventListener);
      return state.configuration;
    });

  const write = (action) => {
    if (!state.server || !state.server.connected || !state.characteristic) return Promise.reject();
    const stringify = `[[[${JSON.stringify(action)}]]]`;
    const message = encode(stringify);
    const key = encode(`${state.id}:`);
    const dataSize = state.configuration.limit - key.length;
    const writes = [];


    let i = 0;
    do {
      const next = i + dataSize;
      const end = Math.min(next, message.length);
      const data = message.slice(i, end);
      const buffer = new Uint8Array(key.length + data.length);
      buffer.set(key, 0);
      buffer.set(data, key.length);
      writes.push(buffer);

      i = next;
    } while (i < message.length);

    // Serialize Promises
    return writes.reduce((promise, chunk) =>
      promise.then(() => state.characteristic.writeValue(chunk)),
      Promise.resolve());
  };

  return {
    connected: state.server && state.server.connected,
    connect,
    handler,
    write,
    listener,
  };
}
