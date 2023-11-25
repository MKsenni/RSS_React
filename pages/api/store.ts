import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import searchWordReducer from '../../redux/slices/searchWordSlice';
import itemsPerPageReducer from '../../redux/slices/itemsPerPageSlice';
import { peopleApi } from './peopleApi';
import currentPageReducer from '../../redux/slices/currentPageSlice';
import loadingFlagsReducer from '../../redux/slices/loadingFlagsSlice';
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

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
