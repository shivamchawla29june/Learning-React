import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import burgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import AuthReducer from './store/reducers/auth';

import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer,
  auth: AuthReducer
})

const burgerStore = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const Apps = () => {
  return (
    <Provider store={burgerStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )

}
ReactDOM.render(
  <Apps />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
