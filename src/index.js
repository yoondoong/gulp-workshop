import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const App = () => {
  return <div className="test">React, baby!</div>;
};

ReactDOM.render(<App />, document.getElementById('main'));
