/* global jest, test, expect, beforeEach, afterEach */
import { BLENO_CONFIG } from '../../common/config';

import { Bleno } from './index';

let encode = null;
let decode = null;
let mockCharacteristic = null;
let BLENO = null;

jest.mock('bleno', () => jest.fn());
jest.mock('./service', () => jest.fn().mockReturnValue('mockService'));
jest.mock('./characteristic', () => () => mockCharacteristic);
jest.mock('./descriptor', () => jest.fn());

beforeEach(() => {
  encode = jest.fn().mockReturnValue('mockEncode');
  decode = jest.fn().mockReturnValue('mockDecode');

  mockCharacteristic = { updateState: jest.fn() };

  BLENO = {
    Descriptor: 'mockDescriptor',
    Characteristic: 'mockCharacteristic',
    startAdvertising: jest.fn(),
    stopAdvertising: jest.fn(),
    setServices: jest.fn(),
  };
});

afterEach(() => {
  encode = null;
  decode = null;
  mockCharacteristic = null;
  BLENO = null;
});

test('Initialize', () => {
  const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

  expect(Object.keys(bleno)).toEqual([
    'start',
    'handler',
    'notify',
  ]);
});

test('start', () => {
  BLENO.on = jest.fn();
  const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

  bleno.start('mockName', 'mockState');
  expect(BLENO.on).toHaveBeenCalledTimes(2);
});

test('start.stateChange: poweredOn > success', () => {
  BLENO.startAdvertising = (name, services, callback) => {
    expect(name).toBe('mockName');
    expect(services).toEqual([BLENO_CONFIG.SERVICE_UUID]);

    callback(false);

    expect(mockCharacteristic.updateState).toHaveBeenCalledWith('mockStateStart');
  };

  const spyStartAdvertising = jest.spyOn(BLENO, 'startAdvertising');
  BLENO.on = (name, callback) => {
    if (name === 'stateChange') {
      callback('poweredOn');
      expect(spyStartAdvertising).toHaveBeenCalled();
    }
  };

  const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

  bleno.start('mockName', 'mockStateStart');
});

test('start.stateChange: poweredOn > fail', () => {
  BLENO.startAdvertising = (name, services, callback) => {
    expect(name).toBe('mockName');
    expect(services).toEqual([BLENO_CONFIG.SERVICE_UUID]);

    callback(true);

    expect(mockCharacteristic.updateState).not.toHaveBeenCalled();
  };

  const spyStartAdvertising = jest.spyOn(BLENO, 'startAdvertising');
  BLENO.on = (name, callback) => {
    if (name === 'stateChange') {
      callback('poweredOn');
      expect(spyStartAdvertising).toHaveBeenCalled();
    }
  };

  const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

  bleno.start('mockName', 'mockStateStart');
});

// test('start.stateChange: poweredOn > fail', () => {
//   BLENO.on = (name, callback) => {
//     if (name === 'stateChange') {
//       callback('poweredOn');
//       expect(BLENO.startAdvertising).toHaveBeenCalled();
//     }
//   };
//   const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

//   bleno.start('mockName', 'mockState');
// });

test('start.stateChange: poweredOff', () => {
  BLENO.on = (name, callback) => {
    if (name === 'stateChange') {
      callback('poweredOff');
      expect(BLENO.stopAdvertising).toHaveBeenCalled();
    }
  };
  const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

  bleno.start('mockName', 'mockState');
});

test('start.advertisingStart: success', () => {
  BLENO.on = (name, callback) => {
    if (name === 'advertisingStart') {
      callback(false);
      expect(BLENO.setServices).toHaveBeenCalledWith(['mockService']);
    }
  };
  const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

  bleno.start('mockName', 'mockState');
});

test('start.advertisingStart: fail', () => {
  BLENO.on = (name, callback) => {
    if (name === 'advertisingStart') {
      callback(true);
      expect(BLENO.setServices).toHaveBeenCalledTimes(0);
    }
  };
  const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

  bleno.start('mockName', 'mockState');
});

test('handler', () => {
  const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

  expect(mockCharacteristic.onAction).not.toBeDefined();

  bleno.handler('mockAction');

  expect(mockCharacteristic.onAction).toBe('mockAction');
});

test('notify', () => {
  const bleno = Bleno(BLENO, { encode, decode }, BLENO_CONFIG);

  bleno.notify('mockState');

  expect(mockCharacteristic.updateState).toHaveBeenCalledWith('mockState');
});
