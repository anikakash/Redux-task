// store.jsx
import { createStore } from 'redux';
import taskReducer from './Reducer';

const store = createStore(taskReducer);

export default store;
