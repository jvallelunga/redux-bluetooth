import ACTIONS from '../actions';

const { sendAction } = ACTIONS;

export default (actions = []) => store => next => (action) => {
  const { type } = action;
  if (actions.includes(type)) store.dispatch(sendAction(action));
  return next(action);
};
