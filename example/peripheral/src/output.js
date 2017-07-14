const { h, mount, Component } = require('ink');
const { Provider, connect } = require('ink-redux');

export default (store) => {
  class Counter extends Component {
    render(props) {
      return `Counter: ${props.counter}`;
    }
  }

  const mapStateToProps = state => ({
    counter: state,
  });

  const ConnectedCounter = connect(mapStateToProps)(Counter);

  mount((
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>
  ));
};
