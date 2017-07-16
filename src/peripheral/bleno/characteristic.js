export default function Characteristic(uuid, Parent, util, descriptor, { encode, decode }) {
  function ReduxCharacteristic() {
    Parent.call(this, {
      uuid,
      properties: ['read', 'write', 'notify'],
      descriptors: [descriptor],
    });

    this.state = null;
  }

  util.inherits(ReduxCharacteristic, Parent);

  ReduxCharacteristic.prototype.onWriteRequest =
  function (data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
      return;
    }

    this.onAction(decode(data));

    callback(this.RESULT_SUCCESS);
  };

  ReduxCharacteristic.prototype.onReadRequest = function (offset, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG, null);
      return;
    }

    callback(this.RESULT_SUCCESS, this.state);
  };

  ReduxCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    this.updateValueCallback = updateValueCallback;
  };

  ReduxCharacteristic.prototype.onUnsubscribe = function () {
    this.updateValueCallback = null;
  };

  ReduxCharacteristic.prototype.onAction = function () {
    return true;
  };

  ReduxCharacteristic.prototype.updateState = function (state) {
    this.state = encode(state);
    if (this.updateValueCallback) {
      this.updateValueCallback(this.state);
    }
  };

  return new ReduxCharacteristic();
}
