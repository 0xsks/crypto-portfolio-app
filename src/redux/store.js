import { configureStore } from '@reduxjs/toolkit';
import { portfolioReducer } from './reducers';

const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  }
});

export default store;