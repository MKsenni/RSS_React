import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PersonProps } from '../../lib/data/types';

export interface IItemsPerPageStore {
  itemsPerPage?: PersonProps[];
}

const initialState: IItemsPerPageStore = {
  itemsPerPage: [],
};

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    updateItems: (state, action: PayloadAction<PersonProps[] | undefined>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { updateItems } = itemsPerPageSlice.actions;

export default itemsPerPageSlice.reducer;
