import { createStore, combineReducers } from 'redux';
import { portfolioReducer } from './reducers';

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
});

const store = createStore(rootReducer);

export default store;
