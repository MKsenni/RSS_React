import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PeopleResponse } from './types';
import { baseUrl } from '../data/constants';

type QueryProps = {
  page: number;
  searchWord: string;
};

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getPeople: build.query<PeopleResponse, QueryProps>({
      query: ({ page, searchWord }) => `/?page=${page}&search=${searchWord}`,
    }),
    getPerson: build.query<PeopleResponse, string>({
      query: (searchWord: string) => `/?search=${searchWord}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = peopleApi;