import { createStore, applyMiddleware , compose } from 'redux'
import reduxThunk from 'redux-thunk';
import combineReducers from './Reducers/index';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(combineReducers,enhancer(applyMiddleware(reduxThunk)))

export default store;