import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import axios from 'axios'; 

import store from './store';

import Wrapper from './containers/wrapper';

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    tweets: [],
    error: null
} 






ReactDom.render(
    <Provider store={store}>
         <Wrapper lines={'3'} />
    </Provider>,
    document.getElementById('react-main')

);