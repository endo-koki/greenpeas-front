import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import allDateReducer from '../features/allDateSlice';

export const store = configureStore({
  reducer: {
    allDate: allDateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
