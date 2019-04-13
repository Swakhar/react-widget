import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

const createStoreWithMiddleware = applyMiddleware()(createStore);

const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
  <App />
</Provider>, rootElement);
