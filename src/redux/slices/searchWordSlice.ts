import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SearchWordStore {
  searchWord: string | null;
}

const initialState: SearchWordStore = {
  searchWord: '' || localStorage.getItem('searchWord'),
};

export const searchWordSlice = createSlice({
  name: 'searchWord',
  initialState,
  reducers: {
    // setLocalStorage: (state) => {
    //   localStorage.setItem('searchWord', state.searchWord);
    // },
    // getLocalStorage: (state) => {
    //   const wordLS = localStorage.getItem('searchWord');
    //   wordLS ? (state.searchWord = wordLS) : (state.searchWord = '');
    // },
    setWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
      localStorage.setItem('searchWord', action.payload);
    },
  },
});

export const { setWord } = searchWordSlice.actions;

export default searchWordSlice.reducer;
