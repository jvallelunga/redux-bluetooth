/* global jest, beforeEach, afterEach, test, expect */
import { CENTRAL_CONFIG } from '../../common/config';
import Central from './central';

const encoder = {
  encode: jest.fn().mockReturnValue('mockEncode'),
  decode: jest.fn().mockReturnValue('[[[{"mockDecode":"mockDecode"}]]]'),
};

const characteristic = {
  startNotifications: jest.fn().mockReturnValue(Promise.resolve()),
  addEventListener: jest.fn(),
  writeValue: jest.fn().mockReturnValue(Promise.resolve()),
  readValue: jest.fn().mockReturnValue(Promise.resolve('mockData')),
};

const service = {
  getCharacteristic: jest.fn().mockReturnValue(Promise.resolve(characteristic)),
};

const server = {
  connected: true,
  getPrimaryService: jest.fn().mockReturnValue(Promise.resolve(service)),
};

const device = {
  gatt: {
    connect: jest.fn().mockReturnValue(Promise.resolve(server)),
  },
};

const bluetooth = {
  requestDevice: jest.fn().mockReturnValue(Promise.resolve(device)),
};

let central = null;

beforeEach(() => {
  central = new Central(123, bluetooth, encoder, CENTRAL_CONFIG);
});

afterEach(() => {
  central = null;
});


test('Central: connect', () => {
  expect.assertions(5);

  const promise = central.connect('mockName').then(() => {
    expect(bluetooth.requestDevice).toBeCalled();
    expect(device.gatt.connect).toBeCalled();
    expect(server.getPrimaryService).toBeCalled();
    expect(service.getCharacteristic).toBeCalled();
    return true;
  });

  return expect(promise).resolves.toBe(true);
});

test('Central: handler', () => {
  const callback = jest.fn();
  expect.assertions(3);

  const promise = central.connect('mockName').then(() => central.handler(callback))
    .then((configuration) => {
      expect(configuration).toEqual({ limit: 20 });
      expect(characteristic.startNotifications).toBeCalled();
      return true;
    });

  return expect(promise).resolves.toBe(true);
});

test('Central: listener - chunk message', () => {
  const callback = jest.fn();
  expect.assertions(3);

  encoder.decode = jest.fn().mockReturnValue('{"mockDecode":"mockDecode"}');
  central = new Central(123, bluetooth, encoder, CENTRAL_CONFIG);

  const promise = central.connect('mockName')
    .then(() => {
      const listener = central.listener(callback);
      const message = listener({ target: { value: 'mockEvent' } });
      expect(callback).not.toBeCalled();
      expect(message).toEqual('{"mockDecode":"mockDecode"}');
      return true;
    });

  return expect(promise).resolves.toBe(true);
});

test('Central: listener - complete message', () => {
  const callback = jest.fn();
  expect.assertions(3);

  encoder.decode = jest.fn().mockReturnValue('[[[{"mockDecode":"mockDecode"}]]]');
  central = new Central(123, bluetooth, encoder, CENTRAL_CONFIG);

  const promise = central.connect('mockName')
    .then(() => {
      const listener = central.listener(callback);
      const message = listener({ target: { value: 'mockEvent' } });
      expect(callback).toBeCalledWith({ mockDecode: 'mockDecode' });
      expect(message).toEqual('');
      return true;
    });

  return expect(promise).resolves.toBe(true);
});

test('Central: listener - internal message', () => {
  const callback = jest.fn();
  expect.assertions(3);

  encoder.decode = jest.fn().mockReturnValue('|||{"mockDecode":"mockDecode"}|||');
  central = new Central(123, bluetooth, encoder, CENTRAL_CONFIG);

  const promise = central.connect('mockName')
    .then(() => {
      const listener = central.listener(callback);
      const message = listener({ target: { value: 'mockEvent' } });
      expect(callback).not.toBeCalled();
      expect(message).toEqual('');
      return true;
    });

  return expect(promise).resolves.toBe(true);
});

test('Central: write - empty message', () => {
  expect.assertions(2);

  encoder.encode = jest.fn().mockReturnValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  central = new Central(123, bluetooth, encoder, CENTRAL_CONFIG);

  const promise = central.connect('mockName')
    .then(() => central.write({ type: 'ACTION' }))
    .then(() => {
      expect(characteristic.writeValue)
        .toBeCalledWith(
          new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
        );
      return true;
    });

  return expect(promise).resolves.toBe(true);
});
