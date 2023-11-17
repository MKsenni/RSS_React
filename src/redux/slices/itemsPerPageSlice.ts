import { createSlice } from '@reduxjs/toolkit';

export interface IItemsPerPageStore {
  itemsPerPage: [];
}

const initialState: IItemsPerPageStore = {
  itemsPerPage: [],
};

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {},
});

export default itemsPerPageSlice.reducer;
