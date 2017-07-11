export default function counter(state = 0, { type }) {
  console.log('Counter: ---------------------------');
  console.log(type)
  console.log(state)
  switch (type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}