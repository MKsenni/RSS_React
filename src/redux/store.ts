import { configureStore } from '@reduxjs/toolkit';
import searchWordReducer from './slices/searchWordSlice';
import itemsPerPageReducer from './slices/itemsPerPageSlice';
import { peopleApi } from '../services/peopleApi';
import currentPageReducer from './slices/currentPageSlice';
import loadingFlagsReducer from './slices/loadingFlagsSlice';

export const store = configureStore({
  reducer: {
    searchWord: searchWordReducer,
    currentPage: currentPageReducer,
    itemsPerPage: itemsPerPageReducer,
    loadingFlags: loadingFlagsReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
