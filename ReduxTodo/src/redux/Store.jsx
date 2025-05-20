// store.jsx
import { createStore } from 'redux';
import taskReducer from './Reducer';

// For Redux DevTools in browser
const store = createStore(taskReducer);

export default store;
