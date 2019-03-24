/* eslint-disable react/react-in-jsx-scope */
const { h, mount, Text } = require('ink');
const { Provider, connect } = require('ink-redux');
const PropTypes = require('prop-types');

export default store => {
  function Counter({ counter, quote }) {
    const color = {
      blue: counter > 0,
      red: counter < 0,
    };
    return (
      <div>
        Counter:
        <Text {...color} > {counter}</Text>
        <br />
        <Text>{quote}</Text>
      </div>
    );
  }

  Counter.propTypes = {
    counter: PropTypes.number,
    quote: PropTypes.string,
  };
  Counter.defaultProps = {
    counter: 0,
    quote: '',
  };

  const mapStateToProps = state => ({
    counter: state.counter,
    quote: state.quote,
  });

  const ConnectedCounter = connect(mapStateToProps)(Counter);

  mount(
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>,
  );
};
