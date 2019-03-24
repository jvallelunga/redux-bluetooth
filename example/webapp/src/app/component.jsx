import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handlerConnect = this.handlerConnect.bind(this);
  }

  handlerConnect() {
    const { onConnect } = this.props;
    onConnect('Counter');
  }

  render() {
    const {
      counter, quote, status, onIncrement, onDecrement,
    } = this.props;

    const nCounter = Number(counter);
    let className = 'app-counter';
    if (nCounter > 0) className += ' app-counter--positive';
    if (nCounter < 0) className += ' app-counter--negative';

    return (
      <div className="app">
        {status === 'CONNECTED' && (
          <div>
            <span className={className}>{counter}</span>
            <br />
            <span>{quote}</span>
          </div>
        )}
        <div className="app-actions">
          {status !== 'CONNECTED' && (
            <button type="button" className="app-actions__buton" onClick={this.handlerConnect}>Connect</button>
          )}
          {status === 'CONNECTED' && (
            <button type="button" className="app-actions__buton" onClick={onIncrement}>+</button>
          )}
          {status === 'CONNECTED' && (
            <button type="button" className="app-actions__buton" onClick={onDecrement}>-</button>
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  counter: PropTypes.number,
  quote: PropTypes.string,
  status: PropTypes.string,
  onConnect: PropTypes.func,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};

App.defaultProps = {
  counter: 0,
  quote: '',
  status: '',
  onConnect: () => true,
  onIncrement: () => true,
  onDecrement: () => true,
};
