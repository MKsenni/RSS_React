import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './actions';
import { PeopleResponse } from './types';

export type QueryProps = {
  page?: number;
  searchWord?: string;
};

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getPeople: build.query<PeopleResponse, number>({
      query: (page: number = 1) => `/?page=${page}`,
    }),
    getPerson: build.query<PeopleResponse, string>({
      query: (searchWord: string) => `/?search=${searchWord}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = peopleApi;
