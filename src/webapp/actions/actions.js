export default function Actions(central, TYPES) {
  const syncState = state => ({
    type: TYPES.BLUETOOTH_SYNC,
    payload: state,
  });

  const sendAction = action => ({
    type: TYPES.BLUETOOTH_SEND_REQUEST,
    request: () => central.write(action),
  });

  const connectStore = name => ({
    type: TYPES.BLUETOOTH_CONNECT_REQUEST,
    request: (dispatch) => {
      dispatch({ type: TYPES.BLUETOOTH_CONNECTING });
      return central
        .connect(name)
        .then(() => central.handler(state => dispatch(syncState(state))))
        .then(() => dispatch({ type: TYPES.BLUETOOTH_CONNECTED }))
        .then(() => dispatch(sendAction({
          type: TYPES.BLUETOOTH_SEND_REQUEST,
          request: () => central.write({
            type: TYPES.BLUETOOTH_SYNC_REQUEST,
          }),
        })));
    },
  });

  const disconnectStore = () => ({
    type: TYPES.BLUETOOTH_DISCONNECT_REQUEST,
    request: (dispatch) => {
      dispatch({ type: TYPES.BLUETOOTH_DISCONNECTING });
      central.disconnect();
      dispatch({ type: TYPES.BLUETOOTH_DISCONNECTED });
    },
  });

  return {
    connectStore,
    disconnectStore,
    syncState,
    sendAction,
  };
}
