import React from 'react';

import { render } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './assets/sass/main.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
