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
  central = new Central(bluetooth, encoder, CENTRAL_CONFIG);
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
  .then((listerner) => {
    expect(characteristic.startNotifications).toBeCalled();
    listerner({ target: { value: 'mockEvent' } });
    expect(callback).toBeCalledWith({ mockDecode: 'mockDecode' });
    return true;
  });

  return expect(promise).resolves.toBe(true);
});

test('Central: read', () => {
  expect.assertions(2);

  const promise = central.connect('mockName').then(() => central.read())
  .then((data) => {
    expect(characteristic.readValue).toBeCalled();
    return data;
  });

  return expect(promise).resolves.toBe('[[[{"mockDecode":"mockDecode"}]]]');
});

test('Central: write', () => {
  expect.assertions(2);

  const promise = central.connect('mockName')
  .then(() => central.write({ type: 'ACTION' }))
  .then(() => {
    expect(characteristic.writeValue).toBeCalledWith('mockEncode');
    return true;
  });

  return expect(promise).resolves.toBe(true);
});

