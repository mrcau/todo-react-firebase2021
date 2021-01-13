import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {fire} from './firebase';
import '@fortawesome/fontawesome-free/js/all.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const fireApp = new fire();
ReactDOM.render(
  <React.StrictMode>
    <App fireApp={fireApp}/>
  </React.StrictMode>,
  document.getElementById('root')
);
