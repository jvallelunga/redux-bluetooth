export default function counter(state = { counter: 0 }, { type, payload }) {
  switch (type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1,
        quote: payload,
      };
    case 'DECREMENT':
      return {
        counter: state.counter - 1,
        quote: payload,
      };
    default:
      return state;
  }
}
