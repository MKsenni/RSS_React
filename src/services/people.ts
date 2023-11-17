import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PeopleResponse, PersonProps, baseUrl } from './actions';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getPeople: builder.query<PeopleResponse, number>({
      query: (page = 1) => `/?page=${page === 0 ? 1 : page}`,
    }),
    getPerson: builder.query<PersonProps, string>({
      query: (searchWord: string) => `/?search=${searchWord}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = peopleApi;
