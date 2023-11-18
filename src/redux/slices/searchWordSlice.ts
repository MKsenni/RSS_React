import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ISearchWordStore {
  searchWord: string | null;
}

const initialState: ISearchWordStore = {
  searchWord: '' || localStorage.getItem('searchWord'),
};

export const searchWordSlice = createSlice({
  name: 'searchWord',
  initialState,
  reducers: {
    setWord: (state, action: PayloadAction<string>) => {
      localStorage.setItem('searchWord', action.payload);
      state.searchWord = action.payload;
    },
  },
});

export const { setWord } = searchWordSlice.actions;

export default searchWordSlice.reducer;
