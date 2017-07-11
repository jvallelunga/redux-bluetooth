import actions from '../actions';
const { sendAction } = actions;

export default (actions = []) => store => next => action => {
  const { type } = action;
  actions.includes(type) && store.dispatch(sendAction(action)); 
  return next(action);
}
