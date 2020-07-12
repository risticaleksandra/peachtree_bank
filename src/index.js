import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css'
import './sass/main.scss';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import DefaultPage from './container/DefaultPage';
import reducer from './store/reducer';

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <DefaultPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('react-app')
);