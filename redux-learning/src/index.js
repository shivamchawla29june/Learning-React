import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const logger = store => {
    return next => {
        return action => {
            console.log('Middleware', action);
            const result = next(action);
            console.log('MiddleWare nextstate', store.getState())
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storeForReact = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={storeForReact}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
