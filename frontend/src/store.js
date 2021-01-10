import { createStore } from 'redux';
import allReducers from './reducers'; // auto find index.js

const store = createStore(allReducers);

export default store;