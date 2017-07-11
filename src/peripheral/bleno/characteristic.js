export default function Characteristic(uuid, Parent, util, descriptor, { encode, decode }) {
  function ReduxCharacteristic() {
    Parent.call(this, {
      uuid,
      properties: ['read', 'write', 'notify'],
      descriptors: [descriptor],
    });

    this.store = null;
  }

  util.inherits(ReduxCharacteristic, Parent);

  ReduxCharacteristic.prototype.connect = function (store) {
    this.store = store;
    this.store.subscribe(() => {
      if (this.updateValueCallback && this.store) {
        const state = this.store.getState();
        this.updateValueCallback(encode(state));
      }
    });
  };

  ReduxCharacteristic.prototype.disconnect = function () {
    this.store = null;
  };

  ReduxCharacteristic.prototype.onWriteRequest =
  function (data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
      return;
    }

    if (this.store) this.store.dispatch(decode(data));

    callback(this.RESULT_SUCCESS);
  };

  ReduxCharacteristic.prototype.onReadRequest = function (offset, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG, null);
      return;
    }

    if (!this.store) {
      callback(this.RESULT_SUCCESS, null);
      return;
    }
    callback(this.RESULT_SUCCESS, encode(this.store.getState()));
  };

  ReduxCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    this.updateValueCallback = updateValueCallback;
  };

  ReduxCharacteristic.prototype.onUnsubscribe = function () {
    this.updateValueCallback = null;
  };

  return new ReduxCharacteristic();
}
