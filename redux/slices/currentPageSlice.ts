import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICurrentPage {
  countPerPage: number;
}

const initialState: ICurrentPage = {
  countPerPage: 10,
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCountPerPage: (state, action: PayloadAction<number>) => {
      state.countPerPage = action.payload;
    },
  },
});

export const { setCountPerPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
