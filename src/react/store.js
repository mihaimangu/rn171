import logger from 'redux-logger';
import thunk from 'redux-thunk';

import {createStore, applyMiddleware, combineReducers} from 'redux';

import combinedReducers from './reducers';

const middleware = applyMiddleware(thunk, logger());

export default createStore(combinedReducers, 
            {
                skus: {},
            },
            middleware);