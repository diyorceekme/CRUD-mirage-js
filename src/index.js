import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./servers/order-server"
import "./servers/product-server"

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
