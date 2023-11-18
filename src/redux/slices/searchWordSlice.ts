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
    // setLocalStorage: (state) => {
    //   localStorage.setItem('searchWord', state.searchWord);
    // },
    // getLocalStorage: (state) => {
    //   const wordLS = localStorage.getItem('searchWord');
    //   wordLS ? (state.searchWord = wordLS) : (state.searchWord = '');
    // },
    setWord: (state, action: PayloadAction<string>) => {
      localStorage.setItem('searchWord', action.payload);
      // return { ...state, searchWord: action.payload };
      state.searchWord = action.payload;
    },
  },
});

export const { setWord } = searchWordSlice.actions;

export default searchWordSlice.reducer;
