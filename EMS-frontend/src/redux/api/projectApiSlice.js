import { createApi } from '@reduxjs/toolkit/query/react';
import { sharedBaseQuery } from './sharedBaseQuery';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: sharedBaseQuery,
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/projects/team-member',
      providesTags: ['Projects'],
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;