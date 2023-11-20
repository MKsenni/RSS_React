import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ILoadingFlagsSlice {
  mainPageLoading: boolean;
  detailsPageLoading: boolean;
}

const initialState: ILoadingFlagsSlice = {
  mainPageLoading: false,
  detailsPageLoading: false,
};

export const loadingFlagsSlice = createSlice({
  name: 'loadingFlags',
  initialState,
  reducers: {
    setLoadingMainPage(state, action: PayloadAction<boolean>) {
      state.mainPageLoading = action.payload;
    },
    setLoadingDetailsPage(state, action: PayloadAction<boolean>) {
      state.detailsPageLoading = action.payload;
    },
  },
});

export const { setLoadingMainPage, setLoadingDetailsPage } =
  loadingFlagsSlice.actions;

export default loadingFlagsSlice.reducer;
