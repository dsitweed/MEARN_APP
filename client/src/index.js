import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import store from "./redux/store";
import { Provider } from "react-redux";

import App from './App';

axios.defaults.withCredentials = true;  // allow receiving cookies

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <Provider store={store}>
      <App />
    </Provider>
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);