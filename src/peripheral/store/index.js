export default bluetooth => (name, store) => {
  bluetooth.start(name, store.getState());

  const handleSubscribe = () => {
    bluetooth.notify(store.getState());
  };

  const handleActions = (action) => {
    store.dispatch(action);
  };

  store.subscribe(handleSubscribe);
  bluetooth.handler(handleActions);

  return { handleSubscribe, handleActions };
};
