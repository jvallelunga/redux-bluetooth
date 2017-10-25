export default function Characteristic(uuid, Parent, util, descriptor, { encode, decode }) {
  function ReduxCharacteristic() {
    Parent.call(this, {
      uuid,
      properties: ['write', 'notify'],
      descriptors: [descriptor],
    });
  }

  util.inherits(ReduxCharacteristic, Parent);

  ReduxCharacteristic.prototype.onWriteRequest =
  function (data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
      return;
    }

    const action = decode(data);
    this.onAction(JSON.parse(action));

    callback(this.RESULT_SUCCESS);
  };

  ReduxCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    this.maxValueSize = maxValueSize;
    this.updateValueCallback = updateValueCallback;
  };

  ReduxCharacteristic.prototype.onUnsubscribe = function () {
    this.updateValueCallback = null;
  };

  ReduxCharacteristic.prototype.onAction = function () {
    return true;
  };

  ReduxCharacteristic.prototype.updateState = function (state) {
    if (this.updateValueCallback) {
      const message = encode(`[[[${JSON.stringify(state)}]]]`);
      let i = 0;
      do {
        const next = i + this.maxValueSize;
        const end = Math.min(next, message.length);
        const data = message.slice(i, end);
        this.updateValueCallback(data);
        i = next;
      } while (i < message.length);
    }
  };

  return new ReduxCharacteristic();
}
