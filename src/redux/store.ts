import { configureStore } from '@reduxjs/toolkit';
import searchWordReducer from './slices/searchWordSlice';
import itemsPerPageReducer from './slices/itemsPerPageSlice';
import { peopleApi } from '../services/peopleApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import currentPageReducer from './slices/currentPageSlice';

export const store = configureStore({
  reducer: {
    searchWord: searchWordReducer,
    currentPage: currentPageReducer,
    itemsPerPage: itemsPerPageReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
