import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { countries } from 'countries-list';

export interface ICountrySlice {
  countries: string[];
  selectCountry?: string;
}

const countryList = Object.values(countries).map((country) => country.name);

const initialState: ICountrySlice = {
  countries: countryList,
  selectCountry: '',
};

export const countrySlice = createSlice({
  name: 'countrySlice',
  initialState,
  reducers: {
    selectCountry: (state, action: PayloadAction<string>) => {
      state.selectCountry = action.payload;
    },
  },
});

export const { selectCountry } = countrySlice.actions;

export default countrySlice.reducer;
