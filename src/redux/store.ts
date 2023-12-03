import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import countrySliceReducer from './slices/countrySlice';
import { peopleApi } from '../services/peopleApi';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    countries: countrySliceReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
