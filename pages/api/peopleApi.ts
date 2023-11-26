import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PeopleResponse } from '../../lib/data/types';
import { baseUrl } from '../../lib/data/constants';
import { HYDRATE } from 'next-redux-wrapper';

type QueryProps = {
  page: number;
  searchWord: string;
};

export const peopleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (build) => ({
    getPeople: build.query<PeopleResponse, QueryProps>({
      query: ({ page, searchWord }) => `/?page=${page}&search=${searchWord}`,
    }),
    getPerson: build.query<PeopleResponse, string>({
      query: (searchWord: string) => `/?search=${searchWord}`,
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useGetPersonQuery,
  util: { getRunningQueriesThunk },
} = peopleApi;
