import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Data } from '../../data/constants';

export interface IData {
  data: Data[];
}

const initialState: IData = {
  data: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadData: (state, action: PayloadAction<Data>) => {
      state.data.push(action.payload);
    },
  },
});

export const { loadData } = dataSlice.actions;

export default dataSlice.reducer;
