import * as TYPES from './types';
import Actions from './actions';

let dispatch = null;
let central = null;

beforeEach(() => {
  dispatch = jest.fn();
  central = {
    connect: jest.fn().mockReturnValue(Promise.resolve()),
    handler: jest.fn(),
    read: jest.fn().mockReturnValue(Promise.resolve('mockState')),
    write: jest.fn().mockReturnValue(Promise.resolve()),
  };  
});

afterEach(() => {
  dispatch = null;
  central = null;
});

test('syncState', () => { 
  const { syncState } = Actions(central, TYPES);  
  const action = syncState('mockState');

  expect(action).toEqual({ 
    type: TYPES.BLUETOOTH_SYNC, 
    payload: 'mockState' 
  });
});

test('connectStore', () => { 
  const { connectStore } = Actions(central, TYPES);  
  expect.assertions(6);

  const promise = connectStore('mockName')(dispatch).then(_ => { 
    expect(central.connect).toBeCalled();
    expect(central.handler).toBeCalled();

    expect(dispatch.mock.calls.length).toBe(2); 
    expect(dispatch.mock.calls[0][0]).toEqual({ type: TYPES.BLUETOOTH_CONNECTING });
    expect(dispatch.mock.calls[1][0]).toEqual({ type: TYPES.BLUETOOTH_CONNECTED });

    return true;
  });

  return expect(promise).resolves.toBe(true);
});

test('syncStore', () => { 
  const { syncStore } = Actions(central, TYPES);
  expect.assertions(3);

  const promise = syncStore()(dispatch).then(_ => { 
    expect(central.read).toBeCalled();
    expect(dispatch).toBeCalledWith({ type: TYPES.BLUETOOTH_SYNC, payload: 'mockState' });

    return true;
  });

  return expect(promise).resolves.toBe(true);
});

test('sendAction', () => { 
  const { sendAction } = Actions(central, TYPES);
  expect.assertions(2);

  const promise = sendAction('mockAction')(dispatch).then(_ => { 
    expect(central.write).toBeCalledWith('mockAction');

    return true;
  });

  return expect(promise).resolves.toBe(true);
});
