import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import configureStore from './store/configureStore';
//COmponent that attaches store to react containers
import {Provider} from 'react-redux';

//can put initial state here, but reducer already sets initial state using an es6 default parameter, if we set initial state here, we overwrite this default config
const store = configureStore();

render(
  //provider takes one prop (store) , which means we can communicate with the store from any component in our application
  <Provider store = {store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
