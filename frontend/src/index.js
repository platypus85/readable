import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promise, logger)),
);

ReactDOM.render(
  <MuiThemeProvider><Root store={store} /></MuiThemeProvider>, 
  document.getElementById('root'));
registerServiceWorker();

export default store;