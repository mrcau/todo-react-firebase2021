import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {fire, firebase} from './firebase';
import '@fortawesome/fontawesome-free/js/all.js'; 

const fireApp = new fire();
ReactDOM.render(
  <React.StrictMode>
    <App firebase={firebase} fireApp={fireApp}/>
  </React.StrictMode>,
  document.getElementById('root')
);
