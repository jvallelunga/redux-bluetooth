/* global jest, test, expect, beforeEach, afterEach */
import util from 'util';

import Characteristic from './characteristic';

function Parent({ uuid, properties, descriptors }) {
  this.uuid = uuid;
  this.properties = properties;
  this.descriptors = descriptors;
  this.RESULT_ATTR_NOT_LONG = 'RESULT_ATTR_NOT_LONG';
  this.RESULT_SUCCESS = 'RESULT_SUCCESS';
}

let encode = null;
let decode = null;

beforeEach(() => {
  encode = jest.fn().mockReturnValue('mockEncode');
  decode = jest.fn().mockReturnValue('123456789:]]]');
});

afterEach(() => {
  encode = null;
  decode = null;
});

test('new Characteristic', () => {
  const characteristic = Characteristic('mockUUID', Parent, util, 'mockDescriptor', {
    encode,
    decode,
  });

  expect(characteristic.uuid).toBe('mockUUID');
  expect(characteristic.properties).toEqual(['writeWithoutResponse', 'read', 'notify']);
  expect(characteristic.descriptors).toEqual(['mockDescriptor']);
});

test('Characteristic.onWriteRequest: RESULT_ATTR_NOT_LONG', () => {
  const characteristic = Characteristic('mockUUID', Parent, util, 'mockDescriptor', {
    encode,
    decode,
  });

  const callback = jest.fn();
  characteristic.onWriteRequest(null, true, false, callback);

  expect(callback).toBeCalledWith('RESULT_ATTR_NOT_LONG');
});

test('Characteristic.onWriteRequest: RESULT_SUCCESS / Chunk', () => {
  let callback = null;
  const characteristic = Characteristic('mockUUID', Parent, util, 'mockDescriptor', {
    encode,
    decode,
  });

  callback = jest.fn();
  const spyOnAction = jest.spyOn(characteristic, 'onAction');
  characteristic.onWriteRequest(null, false, false, callback);

  expect(spyOnAction).not.toBeCalled();
  expect(characteristic.messages[123456789]).toEqual(']]]');
  expect(callback).toBeCalledWith('RESULT_SUCCESS');
});

test('Characteristic.onWriteRequest: RESULT_SUCCESS / Message', () => {
  let callback = null;
  const characteristic = Characteristic('mockUUID', Parent, util, 'mockDescriptor', {
    encode,
    decode,
  });

  callback = jest.fn();
  const spyOnAction = jest.spyOn(characteristic, 'onAction');
  characteristic.messages[123456789] = '[[[{"mockDecode":"mockDecode"}';
  characteristic.onWriteRequest(null, false, false, callback);

  expect(spyOnAction).toBeCalledWith({ mockDecode: 'mockDecode' });
  expect(characteristic.messages[123456789]).toEqual('');
  expect(callback).toBeCalledWith('RESULT_SUCCESS');
});

test('Characteristic.onReadRequest: RESULT_ATTR_NOT_LONG', () => {
  const characteristic = Characteristic('mockUUID', Parent, util, 'mockDescriptor', {
    encode,
    decode,
  });

  const callback = jest.fn();
  characteristic.onReadRequest(true, callback);

  expect(callback).toBeCalledWith('RESULT_ATTR_NOT_LONG', null);
});

test('Characteristic.onReadRequest: RESULT_SUCCESS', () => {
  const characteristic = Characteristic('mockUUID', Parent, util, 'mockDescriptor', {
    encode,
    decode,
  });

  const callback = jest.fn();
  characteristic.onReadRequest(false, callback);

  expect(callback).toBeCalledWith('RESULT_SUCCESS', 'mockEncode');
});

test('Characteristic.onSubscribe', () => {
  const characteristic = Characteristic('mockUUID', Parent, util, 'mockDescriptor', {
    encode,
    decode,
  });

  characteristic.onSubscribe(null, 'mockUpdateValueCallback');

  expect(characteristic.updateValueCallback).toBe('mockUpdateValueCallback');
});

test('Characteristic.onUnsubscribe', () => {
  const characteristic = Characteristic('mockUUID', Parent, util, 'mockDescriptor', {
    encode,
    decode,
  });

  characteristic.onSubscribe(null, 'mockUpdateValueCallback');
  characteristic.onUnsubscribe();

  expect(characteristic.updateValueCallback).toBe(null);
});

test('Characteristic.updateState', () => {
  const characteristic = Characteristic('mockUUID', Parent, util, 'mockDescriptor', {
    encode,
    decode,
  });

  characteristic.updateState({ mockState: 'mockState' });

  const maxValueSize = 10;
  const updateValueCallback = jest.fn();
  characteristic.onSubscribe(maxValueSize, updateValueCallback);
  characteristic.updateState({ mockState: 'mockState' });

  expect(updateValueCallback).toBeCalledWith('mockEncode');
});
