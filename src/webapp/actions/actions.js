export default function Actions(central, TYPES) { 

  const syncState = (state) => ({ 
    type: TYPES.BLUETOOTH_SYNC, 
    payload: state 
  });
    
  const connectStore = (name) => dispatch => { 
    dispatch({ type: TYPES.BLUETOOTH_CONNECTING });
    return central.connect(name)
      .then(() => central.handler((state) => dispatch(syncState(state))))
      .then(() => dispatch({ type: TYPES.BLUETOOTH_CONNECTED }))
      .then(() => dispatch(syncStore()));
  };

  const syncStore = () => dispatch => { 
    return central.read()
      .then(state => dispatch(syncState(state)));
  };

  const sendAction = (action) => _ => {
    return central.write(action);
  };

  return {  
    connectStore, 
    syncStore, 
    syncState,
    sendAction,
  }
}
