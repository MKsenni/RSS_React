import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import searchWordReducer from '../../redux/slices/searchWordSlice';
import itemsPerPageReducer from '../../redux/slices/itemsPerPageSlice';
import { peopleApi } from './peopleApi';
import currentPageReducer from '../../redux/slices/currentPageSlice';
import loadingFlagsReducer from '../../redux/slices/loadingFlagsSlice';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

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

export const makeStore: MakeStore<typeof store> = () => store;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
