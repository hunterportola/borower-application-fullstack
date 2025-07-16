import { configureStore } from '@reduxjs/toolkit';
import loanApplicationReducer from './loanApplicationSlice';

export const store = configureStore({
  reducer: {
    loanApplication: loanApplicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;