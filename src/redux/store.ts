import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import searchWordReducer from './slices/searchWordSlice';
import itemsPerPageReducer from './slices/itemsPerPageSlice';
import { peopleApi } from '../services/peopleApi';
import currentPageReducer from './slices/currentPageSlice';
import loadingFlagsReducer from './slices/loadingFlagsSlice';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

// type Reducers = {
//   searchWord: Reducer<ISearchWordStore>;
//   currentPage: Reducer<ICurrentPage>;
//   itemsPerPage: Reducer<IItemsPerPageStore>;
//   loadingFlags: Reducer<ILoadingFlagsSlice>;
//   [peopleApi.reducerPath]: peopleApi.reducer;
// };

// const reducers = {
//   searchWord: searchWordReducer,
//   currentPage: currentPageReducer,
//   itemsPerPage: itemsPerPageReducer,
//   loadingFlags: loadingFlagsReducer,
//   [peopleApi.reducerPath]: peopleApi.reducer,
// };

// const reducer = combineReducers(reducers);

export const makeStore: MakeStore<typeof store> = () => store;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

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
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
