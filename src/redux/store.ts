import { configureStore } from '@reduxjs/toolkit';
import searchWordReducer from './slices/searchWordSlice';
import itemsPerPageReducer from './slices/itemsPerPageSlice';

export const store = configureStore({
  reducer: {
    searchWord: searchWordReducer,
    itemsPerPage: itemsPerPageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
