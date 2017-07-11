import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class App extends PureComponent { 
  constructor(props) { 
    super(props);

    this.handlerConnect = this.handlerConnect.bind(this);
  }

  handlerConnect(){
    const { onConnect } = this.props;
    onConnect('Counter');
  }

  render() { 
    const { 
      store, status,
      onIncrement, onDecrement
    } = this.props;

    return (
      <div className="app">
        
        { (status === 'CONNECTED') && 
          <div className="app-counter">{store}</div>
        }
        <div className="app-actions"> 
          { (status !== 'CONNECTED') && 
            <button className="app-actions__buton" onClick={this.handlerConnect}>Connect</button>
          }
          { (status === 'CONNECTED') && 
            <button className="app-actions__buton" onClick={onIncrement}>+</button>
          }
          { (status === 'CONNECTED') && 
            <button className="app-actions__buton" onClick={onDecrement}>-</button>
          }
        </div>
      </div>
    );
  }
};

App.propTypes = { 
  store: PropTypes.number,
  status: PropTypes.string,
  onConnect: PropTypes.func,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};

App.defaultProps = { 
  onConnect: () => true,
  onIncrement: () => true,
  onDecrement: () => true,  
};
