export default function Characteristic(uuid, Parent, util, descriptor, { encode, decode }) {
  function ReduxCharacteristic() {
    Parent.call(this, {
      uuid,
      properties: ['writeWithoutResponse', 'read', 'notify'],
      descriptors: [descriptor],
    });
    this.messages = {};
    this.maxValueSize = 20;
  }

  util.inherits(ReduxCharacteristic, Parent);

  ReduxCharacteristic.prototype.onWriteRequest =
  function (data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
      return this.RESULT_ATTR_NOT_LONG;
    }

    const buffer = decode(data);
    const id = buffer.slice(0, 9);
    const chunk = buffer.slice(10, this.maxValueSize);
    const message = ((this.messages[id] || '') + chunk);
    if (message.startsWith('[[[') && message.endsWith(']]]')) {
      const action = JSON.parse(message.slice(3, message.length - 3));
      this.onAction(action);
      this.messages[id] = '';
    } else {
      this.messages[id] = message;
    }

    callback(this.RESULT_SUCCESS);
    return this.RESULT_SUCCESS;
  };

  ReduxCharacteristic.prototype.onReadRequest = function (offset, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG, null);
      return;
    }
    const configuration = encode(
      `|||${JSON.stringify(this.configuration)}|||`,
    );
    callback(this.RESULT_SUCCESS, configuration);
  };

  ReduxCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    this.maxValueSize = maxValueSize;
    this.updateValueCallback = updateValueCallback;
    this.configuration = {
      limit: maxValueSize,
    };
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
