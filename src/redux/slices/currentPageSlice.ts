import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICurrentPage {
  pageNum: number;
  countPerPage: number;
  totalPage: number | null;
}

const initialState: ICurrentPage = {
  pageNum: 1,
  countPerPage: 10,
  totalPage: null,
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.pageNum += 1;
    },
    prevPage: (state) => {
      state.pageNum -= 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pageNum = action.payload;
    },
    setCountPerPage: (state, action: PayloadAction<number>) => {
      state.countPerPage = action.payload;
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
  },
});

export const { nextPage, prevPage, setPage, setCountPerPage, setTotalPage } =
  currentPageSlice.actions;

export default currentPageSlice.reducer;
