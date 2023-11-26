import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PersonProps } from '../../lib/data/types';

export interface IItemsPerPageStore {
  itemsPerPage?: PersonProps[];
  isLoading: boolean;
}

const initialState: IItemsPerPageStore = {
  itemsPerPage: [],
  isLoading: false,
};

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    updateItems: (state, action: PayloadAction<PersonProps[] | undefined>) => {
      state.itemsPerPage = action.payload;
      state.isLoading = true;
    },
  },
});

export const { updateItems } = itemsPerPageSlice.actions;

export default itemsPerPageSlice.reducer;
