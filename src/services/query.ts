import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SubjectsResponse } from '../redux/books/types';

const reducerPath = 'booksapi';
export const booksApi = createApi({
  reducerPath,
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://openlibrary.org/' }),
  endpoints: (builder) => ({
    getLoveSubjects: builder.query<SubjectsResponse, void>({
      query: () => ({
        url: 'subjects/love.json',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetLoveSubjectsQuery } = booksApi;

export const booksQueryReducer = { [reducerPath]: booksApi.reducer };
