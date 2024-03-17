import { createStore } from 'redux';
import rootReducer from './reducers';

// Load the state from localStorage if available
const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

// Create the store with the rootReducer and initial state
const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Subscribe to store changes and save the state in localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

export default store;
