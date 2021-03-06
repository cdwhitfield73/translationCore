const { createStore, applyMiddleware, combineReducers } = require('redux');
const { Provider, connect  } = require('react-redux');
const thunk = require('redux-thunk').default
const reducers = require('../reducers/index.js');
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
const React = require('react');
const Application = require("./app");
module.exports.App = (<Provider store={store}>
    <Application />
</Provider>);
module.exports.dispatch = store.dispatch;
