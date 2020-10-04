import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import FishTank from './FishTank';
// import Smoke from './Smoke'
import Radio from './Radio'
// import Bulky from './Bulky'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Radio />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
