import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import countrySliceReducer from './slices/countrySlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    countries: countrySliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
