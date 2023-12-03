import { configureStore } from '@reduxjs/toolkit';
import searchWordReducer from './slices/searchWordSlice';
import countrySliceReducer from './slices/countrySlice';
import { peopleApi } from '../services/peopleApi';
import currentPageReducer from './slices/currentPageSlice';
import loadingFlagsReducer from './slices/loadingFlagsSlice';

export const store = configureStore({
  reducer: {
    searchWord: searchWordReducer,
    currentPage: currentPageReducer,
    countries: countrySliceReducer,
    loadingFlags: loadingFlagsReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
